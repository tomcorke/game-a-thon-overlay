import { action } from 'typesafe-actions'

import { APIDonationData, APIDonationStreamDataPayload } from '../../../types/api'
import { ApplicationState } from '../reducers'

import config from '../../config'

export const HANDLE_DONATION_STREAM_DATA = 'HANDLE_DONATION_STREAM_DATA'
export const APPROVE_DONATION = 'APPROVE_DONATION'
export const UNAPPROVE_DONATION = 'UNAPPROVE_DONATION'
export const SET_ADMIN_SHOW_APPROVED_DONATIONS = 'SET_ADMIN_SHOW_APPROVED_DONATIONS'
export const SET_ADMIN_SHOW_UNAPPROVED_DONATIONS = 'SET_ADMIN_SHOW_UNAPPROVED_DONATIONS'

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

const _setAdminShowApprovedDonations = (newValue: boolean) => action(
  SET_ADMIN_SHOW_APPROVED_DONATIONS,
  newValue
)

const _setAdminShowUnapprovedDonations = (newValue: boolean) => action(
  SET_ADMIN_SHOW_UNAPPROVED_DONATIONS,
  newValue
)

export const toggleAdminShowApprovedDonations = () => {
  return (dispatch, getState: () => ApplicationState) => {
    const currentValue = getState().donations.adminOptions.showApprovedDonations
    dispatch(_setAdminShowApprovedDonations(!currentValue))
  }
}

export const toggleAdminShowUnapprovedDonations = () => {
  return (dispatch, getState: () => ApplicationState) => {
    const currentValue = getState().donations.adminOptions.showUnapprovedDonations
    dispatch(_setAdminShowUnapprovedDonations(!currentValue))
  }
}

export type DonationsActions = ReturnType<
  | typeof _handleDonationStreamData
  | typeof _setAdminShowApprovedDonations
  | typeof _setAdminShowUnapprovedDonations
>
