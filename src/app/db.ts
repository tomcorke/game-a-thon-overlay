import * as path from 'path'
import * as fs from 'fs-extra'

function clone<T> (obj: T) {
  try {
    return JSON.parse(JSON.stringify(obj)) as T
  } catch (e) {
    // This is fine
  }
}

export class DB<T> {
  filePath: string
  data: {
    [key: string]: T | undefined
  }

  constructor (name: string) {
    this.filePath = path.join(__dirname, `../../../db/${name}.json`)
    this.data = {}
    this.init()
  }

  init () {
    try {
      if (this.filePath) {
        fs.ensureFileSync(this.filePath)
        const rawData = fs.readFileSync(this.filePath, 'utf8')
        this.data = JSON.parse(rawData)
        console.log(`Loaded data from "${this.filePath}"`)
      }
    } catch (e) {
      console.error(`Error loading data from "${this.filePath}": ${e.message}`)
    }
  }

  set (key: string, data: T) {
    this.data[key] = clone(data)
    try {
      if (this.filePath) {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8')
      }
    } catch (e) {
      console.error(`Error writing data to "${this.filePath}": ${e.message}`)
    }
  }

  get (key: string) {
    return clone(this.data[key])
  }

  getAll () {
    return clone(this.data)
  }

  delete (key: string) {
    this.data[key] = undefined
  }
}
