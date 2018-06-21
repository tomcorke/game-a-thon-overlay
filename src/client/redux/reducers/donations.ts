import { Reducer } from 'redux'
import { APIDonationDataWithExtraData, APIFundraiserInfo, APIDonationStreamDataPayload } from '../../../types/api'
import * as donationsActions from '../actions/donations'

interface DonationAdminOptions {
  showApprovedDonations: boolean
  showUnapprovedDonations: boolean
}

export interface DonationsState {
  info?: APIFundraiserInfo
  donations: APIDonationDataWithExtraData[]
  adminOptions: DonationAdminOptions
}

const initialState: DonationsState = {
  donations: [],
  adminOptions: {
    showApprovedDonations: true,
    showUnapprovedDonations: true
  }
}

const handledonationStreamData = (state: DonationsState, data: APIDonationStreamDataPayload): DonationsState => {
  return {
    ...state,
    ...data
  }
}

const handleSetAdminShowApprovedDonations = (state: DonationsState, newValue: boolean): DonationsState => {
  return {
    ...state,
    adminOptions: {
      ...state.adminOptions,
      showApprovedDonations: newValue
    }
  }
}

const handleSetAdminShowUnapprovedDonations = (state: DonationsState, newValue: boolean): DonationsState => {
  return {
    ...state,
    adminOptions: {
      ...state.adminOptions,
      showUnapprovedDonations: newValue
    }
  }
}

const donationsReducer: Reducer<DonationsState, donationsActions.DonationsActions> = (state = initialState, action) => {
  switch (action.type) {
    case donationsActions.HANDLE_DONATION_STREAM_DATA:
      return handledonationStreamData(state, action.payload)
    case donationsActions.SET_ADMIN_SHOW_APPROVED_DONATIONS:
      return handleSetAdminShowApprovedDonations(state, action.payload)
    case donationsActions.SET_ADMIN_SHOW_UNAPPROVED_DONATIONS:
      return handleSetAdminShowUnapprovedDonations(state, action.payload)
    default:
      return state
  }
}

export default donationsReducer
