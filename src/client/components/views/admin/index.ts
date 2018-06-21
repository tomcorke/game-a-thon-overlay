import { connect } from 'react-redux'
import * as donationActions from '../../../redux/actions/donations'
import { ApplicationState, Dispatch } from '../../../redux/reducers'

import AdminView from './admin'

const ConnectedAdminView = connect(
  (state: ApplicationState) => ({
    donations: state.donations.donations
  }),
  (dispatch: Dispatch) => ({
    approveDonation: (hash: string) => dispatch(donationActions.approveDonation(hash)),
    unapproveDonation: (hash: string) => dispatch(donationActions.unapproveDonation(hash))
  })
)(AdminView)

export default ConnectedAdminView
