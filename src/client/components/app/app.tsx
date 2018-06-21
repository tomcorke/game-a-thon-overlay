import * as React from 'react'

import { View } from '../../types'
import DefaultView from '../views/default'
import AdminView from '../views/admin'
import DisplayView from '../views/display'

import * as STYLES from './app.scss'

const viewComponents: { [view: string]: () => JSX.Element } = {
  default: () => <DefaultView />,
  admin: () => <AdminView />,
  display: () => <DisplayView />
}

interface AppProps {
  view: View
  initDonationRefresh: () => any
  initDisplayPhaser: () => any
}

class App extends React.Component<AppProps> {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    this.props.initDonationRefresh && this.props.initDonationRefresh()
    this.props.initDisplayPhaser && this.props.initDisplayPhaser()
  }

  render () {
    const { view, initDonationRefresh } = this.props
    const ViewToDisplay = viewComponents[view]

    return (
      <div className={STYLES.app}>
        <ViewToDisplay />
      </div>
    )
  }
}

export default App
