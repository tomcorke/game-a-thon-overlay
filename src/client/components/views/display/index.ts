import { connect } from 'react-redux'

import { ApplicationState } from '../../../redux/reducers'

import DisplayView from './display'

const ConnectedDisplayView = connect(
  (state: ApplicationState) => ({
    info: state.donations.info,
    approvedDonations: state.donations.donations.filter(d => d.approved),
    displayPhases: state.displayPhaser.displayPhases
  })
)(DisplayView)

export default ConnectedDisplayView
