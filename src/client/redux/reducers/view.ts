import { Reducer } from 'redux'
import { View, VIEWS } from '../../types'
import { ViewActions, SET_VIEW } from '../actions/view'

export interface ViewState {
  view: View
}

const viewFromHash = (): View | false => {
  const hashView = window.location.hash.substr(1) as View
  if (VIEWS.includes(hashView)) {
    return hashView
  }
  return false
}

const initialState: ViewState = {
  view: viewFromHash() || 'default'
}

const handleSetView = (state: ViewState, view: View): ViewState => {
  return {
    ...state,
    view
  }
}

const viewReducer: Reducer<ViewState, ViewActions> = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW:
      return handleSetView(state, action.payload)
    default:
      return state
  }
}

export default viewReducer
