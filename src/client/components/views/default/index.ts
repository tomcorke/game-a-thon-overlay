import { connect } from 'react-redux'
import { setView } from '../../../redux/actions/view'
import { View } from '../../../types'

import DefaultView from './default'

const ConnectedDefaultView = connect(
  null,
  (dispatch) => ({
    setView: (view: View) => dispatch(setView(view))
  })
)(DefaultView)

export default ConnectedDefaultView
