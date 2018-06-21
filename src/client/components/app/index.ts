import { connect } from 'react-redux'
import { initDonationStreamDataRefresh } from '../../redux/actions/donations'
import { ApplicationState, Dispatch } from '../../redux/reducers'

import App from './app'

const ConnectedApp = connect(
  (state: ApplicationState) => ({
    view: state.view.view
  }),
  (dispatch: Dispatch) => ({
    initDonationRefresh: dispatch(initDonationStreamDataRefresh())
  })
)(App)

export default ConnectedApp
