import * as request from 'request-promise-native'

// Example fundraiser for testing
const fundraiserName = 'midlands-hearing-implant-programme-fundraising'

// const fundraiserName = 'game-a-thon-2018'

const endpoints: { [name: string]: string } = {
  info: `http://api.justgiving.com/v1/fundraising/pages/${fundraiserName}`,
  donations: `http://api.justgiving.com/v1/fundraising/pages/${fundraiserName}/donations`
}

type EndpointData = any

type EndpointDataPromise = Promise<EndpointData>

require('dotenv-safe').config()

const API_KEY = process.env.JUSTGIVING_API_KEY

const getEndpoint = (endpoint: string): EndpointDataPromise => {
  return request({
    url: endpoint,
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY
    }
  })
  .then(result => JSON.parse(result))
}

interface EndpointDataMap {
  info: EndpointData
  donations: EndpointData
}

const getFreshData = async (): Promise<EndpointDataMap> => {
  return {
    info: await getEndpoint(endpoints.info),
    donations: await getEndpoint(endpoints.donations)
  }
}

let dataCache: EndpointDataMap | undefined
let dataCachePromise: Promise<EndpointDataMap> | undefined

const getData = async (): Promise<EndpointDataMap> => {
  if (dataCache !== undefined) return dataCache

  if (dataCachePromise === undefined) {
    const newDataFetcher = getFreshData()

    newDataFetcher.then((data) => {
      dataCache = data
      dataCachePromise = undefined
    })

    dataCachePromise = newDataFetcher
  }

  return dataCachePromise
}

export { getData }
