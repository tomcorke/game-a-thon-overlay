import { Reducer } from 'redux'
import { APIDonationDataWithExtraData, APIFundraiserInfo, APIDonationStreamDataPayload } from '../../../types/api'
import { DonationsActions, HANDLE_DONATION_STREAM_DATA } from '../actions/donations'

export interface DonationsState {
  info?: APIFundraiserInfo
  donations: APIDonationDataWithExtraData[]
}

const initialState: DonationsState = {
  donations: []
}

const handledonationStreamData = (state: DonationsState, data: APIDonationStreamDataPayload) => {
  return {
    ...state,
    ...data
  }
}

const donationsReducer: Reducer<DonationsState, DonationsActions> = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DONATION_STREAM_DATA:
      return handledonationStreamData(state, action.payload)
    default:
      return state
  }
}

export default donationsReducer
