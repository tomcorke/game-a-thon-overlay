import { connect } from 'react-redux'

import { ApplicationState } from '../../../redux/reducers'

import DisplayView from './display'

const ConnectedDisplayView = connect(
  (state: ApplicationState) => ({
    approvedDonations: state.donations.donations.filter(d => d.approved)
  })
)(DisplayView)

export default ConnectedDisplayView
