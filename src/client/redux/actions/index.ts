import { Action } from 'redux'

import * as donationsActions from './donations'
import * as viewActions from './view'

const actions = {
  donations: donationsActions,
  view: viewActions
}

export type ApplicationAction =
  | donationsActions.DonationsActions
  | viewActions.ViewActions

export default actions
