import * as React from 'react'
import { View } from '../../../types'

import * as STYLES from './default.scss'

interface DefaultViewProps {
  setView: (view: View) => any
}

const DefaultView = ({ setView }: DefaultViewProps) => {
  return (
    <div className={STYLES.default}>
      <a className={STYLES.adminButton} onClick={() => setView('admin')}>Admin</a>
      <a className={STYLES.displayButton} onClick={() => setView('display')}>Display</a>
    </div>
  )
}

export default DefaultView
