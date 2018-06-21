import * as React from 'react'

import * as STYLES from './display.scss'
import { APIDonationData } from '../../../../types/api'

interface DonationProps {
  donation: APIDonationData
}

const getCurrencySymbol = (code: string): string => {
  switch (code) {
    case 'GBP':
      return '£'
    default:
      return ''
  }
}

const format = (value: number, maxDecimals: number = 0, minDecimals: number = 0): string => {
  const mul = Math.pow(10, maxDecimals)
  let s = String(Math.floor(value * mul) / mul)
  const decimalIndex = s.indexOf('.')
  console.log(s, decimalIndex)
  if (decimalIndex === 0) {
    s = `${s}.${'0'.repeat(minDecimals)}`
  } else {
    const numDecimals = s.substr(decimalIndex + 1).length
    const missingDecimals = minDecimals - numDecimals
    if (missingDecimals > 0) {
      s = `${s}${'0'.repeat(missingDecimals)}`
    }
    console.log(s, numDecimals, missingDecimals)
  }
  return s
}

const Donation = ({ donation }: DonationProps) => {
  return (
    <div className={STYLES.donation}>
      <div className={STYLES.amount}>{getCurrencySymbol(donation.currency)}{format(donation.amount, 2, 2)}</div>
      <div className={STYLES.donator}>{donation.name}</div>
      <div className={STYLES.message}>{donation.message}</div>
    </div>
  )
}

interface DisplayViewProps {
  approvedDonations: APIDonationData[]
}

const DisplayView = ({ approvedDonations }: DisplayViewProps) => {

  const latestDonation = approvedDonations
    .sort((a, b) => b.timestamp - a.timestamp)[0]

  console.log(latestDonation)

  return (
    <div className={STYLES.display}>
      {latestDonation && (
        <div className={STYLES.lastDonation}>
          Latest donation:
          <Donation donation={latestDonation} />
        </div>
      )}
    </div>
  )
}

export default DisplayView
