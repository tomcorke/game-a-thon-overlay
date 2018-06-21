import { Reducer } from 'redux'
import { APIDonationData } from '../../../types/api'
import { DonationsActions, HANDLE_DONATION_STREAM_DATA } from '../actions/donations'

export interface DonationsState {
  donations: APIDonationData[]
}

const initialState: DonationsState = {
  donations: []
}

const handledonationStreamData = (state: DonationsState, data: APIDonationData[]) => {
  return {
    ...state,
    donations: data
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
