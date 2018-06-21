import * as path from 'path'
import * as express from 'express'
import * as onFinished from 'on-finished'
import * as handlebars from 'express-handlebars'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'

import { getData } from './data'

import { APIDonationData } from '../types/api'

import { DB } from './db'

const donationApprovalDb = new DB<boolean>('donation-approval')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(compression())

app.engine('.hbs', handlebars({
  extname: '.hbs'
}))
app.set('views', path.join(__dirname, '../../src/app/views'))
app.set('view engine', '.hbs')

app.use((req, res, next) => {
  onFinished(res, (err, res) => {
    if (err) { console.error(err) }
    console.log(`${res.statusCode} ${req.method} ${req.path}`)
  })
  next()
})

export const hashCode = (donation: APIDonationData): string => {
  const donationWithoutHash = { ...donation, hash: '' }
  const dataString = JSON.stringify(donationWithoutHash)
  let hash = 0
  if (dataString.length === 0) return ''
  for (let i = 0; i < dataString.length; i++) {
    const chr = dataString.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash.toString(16)
}

const parseTime = (stringValue: string) => {
  const timestampPattern = /\/Date\((\d+)+\+(\d+)\)\//
  const matches = stringValue.match(timestampPattern)
  return (matches && +matches[1]) || 0
}

app.get('/donation-stream-data', async (req, res) => {
  const data = await getData()

  const donations: APIDonationData[] = data.donations.donations
    .map((d: any): APIDonationData => {

      const donation: APIDonationData = {
        name: d.donorDisplayName,
        message: d.message,
        amount: d.amount,
        currency: d.currencyCode,
        timestamp: parseTime(d.donationDate),
        hash: '',
        approved: false
      }

      donation.hash = hashCode(donation)
      donation.approved = !!donationApprovalDb.get(donation.hash)

      return donation
    })

  res.json(donations)
})

app.post('/approve-donation', async (req, res) => {
  const body = req.body
  const donationHash = body.hash
  donationApprovalDb.set(donationHash, true)
  res.status(200).send()
})

app.post('/unapprove-donation', async (req, res) => {
  const body = req.body
  const donationHash = body.hash
  donationApprovalDb.set(donationHash, false)
  res.status(200).send()
})

app.get('/*', express.static(path.join(__dirname, '../client')))

const PORT = 3200
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
