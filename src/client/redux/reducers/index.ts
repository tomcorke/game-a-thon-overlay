import { combineReducers, Reducer } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { ApplicationAction } from '../actions'

import displayPhaserReducer, { DisplayPhaserState } from './display-phaser'
import donationsReducer, { DonationsState } from './donations'
import viewReducer, { ViewState } from '../reducers/view'

export interface ApplicationState {
  displayPhaser: DisplayPhaserState
  donations: DonationsState
  view: ViewState
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  displayPhaser: displayPhaserReducer,
  donations: donationsReducer,
  view: viewReducer
})

export type Dispatch = ThunkDispatch<ApplicationState, null, ApplicationAction>

export default rootReducer
