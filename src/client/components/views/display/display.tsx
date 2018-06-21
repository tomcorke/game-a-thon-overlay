import * as React from 'react'
import { APIDonationDataWithExtraData, APIFundraiserInfo } from '../../../../types/api'
import { DisplayPhase } from '../../../types'

import * as STYLES from './display.scss'

interface ProgressBarProps {
  progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {

  const minFillWidth = 0.1
  const maxFillWith = 92
  const width = Math.min(100, minFillWidth + ((maxFillWith - minFillWidth) * (Math.min(progress, 100) / 100)))

  let extraBarClass = ''
  if (progress >= 100) {
    extraBarClass = STYLES.progressBar__full
  }

  return (
    <div className={STYLES.progressBar}>
      <div className={STYLES.progressBar__background} />
      <div className={`${STYLES.progressBar__fill} ${extraBarClass}`} style={{ width: `${width}%` }} />
      <div className={STYLES.progressBar__foreground} />
    </div>
  )
}

interface DonationProps {
  donation: APIDonationDataWithExtraData
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
  if (decimalIndex === 0) {
    s = `${s}.${'0'.repeat(minDecimals)}`
  } else {
    const numDecimals = s.substr(decimalIndex + 1).length
    const missingDecimals = minDecimals - numDecimals
    if (missingDecimals > 0) {
      s = `${s}${'0'.repeat(missingDecimals)}`
    }
  }
  return s
}

const Donation = ({ donation }: DonationProps) => {
  const amount = donation.amount === null ? 0 : +donation.amount
  return (
    <div className={STYLES.donation}>
      <div className={STYLES.amount}>{getCurrencySymbol(donation.currencyCode)}{format(amount, 2, 2)}</div>
      <div className={STYLES.name}>{donation.donorDisplayName}</div>
      <div className={STYLES.message}>{donation.message}</div>
    </div>
  )
}

interface DisplayViewProps {
  info?: APIFundraiserInfo,
  approvedDonations: APIDonationDataWithExtraData[],
  displayPhases: { [displayPhase: string]: DisplayPhase }
}

const DisplayView = ({ info, approvedDonations, displayPhases }: DisplayViewProps) => {

  const getLastDonation = () => {
    const lastDonation = approvedDonations
      .filter(d => d.amount !== null)
      .sort((a, b) => b.timestamp - a.timestamp)[0]

    const lastDonationDisplayPhase: DisplayPhase = displayPhases['lastDonation'] || 'hide'

    return lastDonation ?
      <div className={`${STYLES.donationDisplay} ${lastDonationDisplayPhase}`}>
        Latest donation:
        <Donation donation={lastDonation} />
      </div> :
      null
  }

  const getTopDonation = () => {
    const topDonation = approvedDonations
      .filter(d => d.amount !== null)
      .sort((a, b) => (b.amount === null ? 0 : +b.amount) - (a.amount === null ? 0 : +a.amount))[0]

    const topDonationDisplayPhase: DisplayPhase = displayPhases['topDonation'] || 'hide'

    return topDonation ?
    <div className={`${STYLES.donationDisplay} ${topDonationDisplayPhase}`}>
      Top donation:
      <Donation donation={topDonation} />
    </div> :
    null
  }

  const lastDonationDisplay = getLastDonation()

  const topDonationDisplay = getTopDonation()

  return (
    <div className={STYLES.display}>

      <div className={STYLES.progressDisplay}>
        <ProgressBar progress={info ? +info.totalRaisedPercentageOfFundraisingTarget : 0} />
      </div>

      <div className={STYLES.phasedDisplay}>
        {lastDonationDisplay}
        {topDonationDisplay}
      </div>

      {/*<div className={STYLES.borderOverlay} />*/}

      {info ?
        <div className={STYLES.infoDisplay}>
          <div className={STYLES.infoDisplay__inner}>
            <div className={STYLES.infoDisplay__title}>{info.eventName}</div>
            <div className={STYLES.infoDisplay__raised}>
              <span>Raised £{info.grandTotalRaisedExcludingGiftAid} of target £{info.fundraisingTarget}</span>
            </div>
            <div className={STYLES.infoDisplay__target}>
              <span>£{info.fundraisingTarget}</span>
            </div>
          </div>
        </div> :
        null
      }

    </div>
  )
}

export default DisplayView
