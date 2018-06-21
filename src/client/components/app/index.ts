import { connect } from 'react-redux'
import { initDonationStreamDataRefresh } from '../../redux/actions/donations'
import { initDisplayPhaser } from '../../redux/actions/display-phaser'
import { ApplicationState, Dispatch } from '../../redux/reducers'

import App from './app'

const ConnectedApp = connect(
  (state: ApplicationState) => ({
    view: state.view.view
  }),
  (dispatch: Dispatch) => ({
    initDonationRefresh: dispatch(initDonationStreamDataRefresh()),
    initDisplayPhaser: dispatch(initDisplayPhaser())
  })
)(App)

export default ConnectedApp
