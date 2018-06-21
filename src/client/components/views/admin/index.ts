import { connect } from 'react-redux'
import * as donationActions from '../../../redux/actions/donations'
import { ApplicationState, Dispatch } from '../../../redux/reducers'

import AdminView from './admin'

const ConnectedAdminView = connect(
  (state: ApplicationState) => ({
    donations: state.donations.donations
      .filter(donation => state.donations.adminOptions.showApprovedDonations || !donation.approved)
      .filter(donation => state.donations.adminOptions.showUnapprovedDonations || donation.approved),
    showApprovedDonations: state.donations.adminOptions.showApprovedDonations,
    showUnapprovedDonations: state.donations.adminOptions.showUnapprovedDonations
  }),
  (dispatch: Dispatch) => ({
    approveDonation: (hash: string) => dispatch(donationActions.approveDonation(hash)),
    unapproveDonation: (hash: string) => dispatch(donationActions.unapproveDonation(hash)),
    toggleShowApprovedDonations: () => dispatch(donationActions.toggleAdminShowApprovedDonations()),
    toggleShowUnapprovedDonations: () => dispatch(donationActions.toggleAdminShowUnapprovedDonations())
  })
)(AdminView)

export default ConnectedAdminView
