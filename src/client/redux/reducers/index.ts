import { combineReducers, Reducer } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { ApplicationAction } from '../actions'
import viewReducer, { ViewState } from '../reducers/view'
import donationsReducer, { DonationsState } from './donations'

export interface ApplicationState {
  view: ViewState
  donations: DonationsState
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  view: viewReducer,
  donations: donationsReducer
})

export type Dispatch = ThunkDispatch<ApplicationState, null, ApplicationAction>

export default rootReducer
