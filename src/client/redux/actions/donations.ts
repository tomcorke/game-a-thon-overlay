import { action } from 'typesafe-actions'

import { APIDonationData, APIDonationStreamDataPayload } from '../../../types/api'

import config from '../../config'

export const HANDLE_DONATION_STREAM_DATA = 'HANDLE_DONATION_STREAM_DATA'
export const APPROVE_DONATION = 'APPROVE_DONATION'
export const UNAPPROVE_DONATION = 'UNAPPROVE_DONATION'

const APPROVE_DONATION_ENDPOINT = config.approveDonationEndpoint
const UNAPPROVE_DONATION_ENDPOINT = config.unapproveDonationEndpoint
const DONATION_STREAM_DATA_ENDPOINT = config.donationStreamDataEndpoint

const _handleDonationStreamData = (data: APIDonationStreamDataPayload) => action(
  HANDLE_DONATION_STREAM_DATA,
  data
)

export const getDonationStreamData = () => {
  return async (dispatch) => {
    console.log('fetching donation stream data')
    fetch(DONATION_STREAM_DATA_ENDPOINT)
      .then(response => response.json())
      .then(data => dispatch(_handleDonationStreamData(data as APIDonationStreamDataPayload)))
      .catch(err => console.error(err))
  }
}

const postDonationAction = (endpoint: string, donationHash: string) => {
  console.log('postDonationAction', endpoint, donationHash)
  return async (dispatch) => {
    try {
      await fetch(
        endpoint,
        {
          body: JSON.stringify({ hash: donationHash }),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        }
      )
      dispatch(getDonationStreamData())
    } catch (err) {
      console.error(err)
    }
  }
}

export const approveDonation = (donationHash: string) =>
  postDonationAction(APPROVE_DONATION_ENDPOINT, donationHash)

export const unapproveDonation = (donationHash: string) =>
  postDonationAction(UNAPPROVE_DONATION_ENDPOINT, donationHash)

let donationRefreshTimeout: number | undefined
const DONATION_REFRESH_INTERVAL = 30000

export const initDonationStreamDataRefresh = () => {
  console.log('initDonationsStreamDataRefresh')
  return (dispatch) => {
    const update = async () => dispatch(getDonationStreamData())

    const scheduleUpdate = () => {
      update()
        .then(() => {
          if (donationRefreshTimeout) {
            window.clearTimeout(donationRefreshTimeout)
          }
          donationRefreshTimeout = window.setTimeout(scheduleUpdate, DONATION_REFRESH_INTERVAL)
        })
    }

    scheduleUpdate()
  }
}

export type DonationsActions = ReturnType<
  | typeof _handleDonationStreamData
>
