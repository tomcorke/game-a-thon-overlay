import * as request from 'request-promise-native'
import { Promise as BluebirdPromise } from 'bluebird'

import { DonationsEndpointResult, MergedDonationsEndpointResult } from './endpoint-result-types'
import { APIFundraiserInfo } from '../types/api'

require('dotenv-safe').config()

const fundraiserName = process.env.FUNDRAISER_NAME

const endpoints: { [name: string]: string } = {
  info: `http://api.justgiving.com/v1/fundraising/pages/${fundraiserName}`,
  donations: `http://api.justgiving.com/v1/fundraising/pages/${fundraiserName}/donations`
}

type EndpointData = any
type EndpointDataPromise = Promise<EndpointData>

const API_KEY = process.env.JUSTGIVING_API_KEY

const getEndpoint = (endpoint: string): EndpointDataPromise => {
  console.log(`Fetching ${endpoint}`)
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
  info?: APIFundraiserInfo
  donations: MergedDonationsEndpointResult
}

const PAGE_SIZE = 150

const getAllDonations = async (): Promise<MergedDonationsEndpointResult> => {
  const firstPageEndpoint = `${endpoints.donations}?pageSize=${PAGE_SIZE}`
  const firstPage = await getEndpoint(firstPageEndpoint) as DonationsEndpointResult
  const pagination = firstPage.pagination

  if (pagination.totalPages === 1) {
    return firstPage
  }

  const pageFetchers: Promise<DonationsEndpointResult>[] = []
  for (let i = 2; i <= pagination.totalPages; i += 1) {
    const pageEndpoint = `${endpoints.donations}?pageNum=${i}&pageSize=${PAGE_SIZE}`
    pageFetchers.push(getEndpoint(pageEndpoint))
  }

  const pageResults = await BluebirdPromise
    .map(
      pageFetchers,
      data => {
        console.log(`Fetched page ${data.pagination.pageNumber} of ${data.pagination.totalPages}`)
        return data
      },
      { concurrency: 5 })

  const mergedResults: MergedDonationsEndpointResult = pageResults.reduce((allResults, page) => {
    return {
      ...allResults,
      donations: allResults.donations.concat(page.donations)
    }
  }, firstPage)

  return mergedResults
}

const getFreshData = async (): Promise<EndpointDataMap> => {
  return {
    info: await getEndpoint(endpoints.info) as APIFundraiserInfo,
    donations: await getAllDonations()
  }
}

let dataCache: EndpointDataMap | undefined
let dataCachePromise: Promise<EndpointDataMap> | undefined

let dataRefreshThrottled = false
const DATA_REFRESH_THROTTLE_TIME = 60000

const getData = async (): Promise<EndpointDataMap> => {

  if (!dataCache || !dataRefreshThrottled) {
    if (dataCachePromise === undefined) {
      const newDataFetcher = getFreshData()

      newDataFetcher.then((data) => {
        dataCache = data
        dataCachePromise = undefined
      })

      dataCachePromise = newDataFetcher

      dataRefreshThrottled = true
      setTimeout(() => {
        dataRefreshThrottled = false
      }, DATA_REFRESH_THROTTLE_TIME)
    }

    if (!dataCache) {
      console.log('Returning pending fundraiser data promise')
      return dataCachePromise
    }
  }

  if (dataCache !== undefined) {
    console.log('Returning cached fundraiser data')
    return dataCache
  }

  console.log('Returning empty fundraiser data')
  return {
    info: undefined,
    donations: { donations: [] }
  }
}

export { getData }
