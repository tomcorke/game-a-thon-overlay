import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './redux/store/configure'

import App from './components/app'

import './reset.scss'
import './base.scss'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
