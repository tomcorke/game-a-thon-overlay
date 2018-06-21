import * as React from 'react'
import { APIDonationDataWithExtraData } from '../../../../types/api'

import * as STYLES from './admin.scss'

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

interface DonationProps {
  donation: APIDonationDataWithExtraData
  onApprove: () => any
  onUnapprove: () => any
}

const Donation = ({ donation, onApprove, onUnapprove }: DonationProps) => {

  const approveDisplay = donation.approved
    ? <a className={STYLES.unapproveButton} onClick={onUnapprove}>Unapprove</a>
    : <a className={STYLES.approveButton} onClick={onApprove}>Approve</a>

  const date = new Date(donation.timestamp)
  const dateDisplay = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  return (
    <div className={STYLES.donation}>
      <div className={STYLES.approveDisplay}>
        {approveDisplay}
      </div>
      <div className={STYLES.date}>{dateDisplay}</div>
      <div className={STYLES.amount}>{donation.amount ? `${format(+donation.amount, 2, 2)} ${donation.currencyCode}` : ''}</div>
      <div className={STYLES.name}>{donation.donorDisplayName}</div>
      <div className={STYLES.message}>{donation.message}</div>
    </div>
  )
}

interface AdminViewProps {
  donations: APIDonationDataWithExtraData[]
  approveDonation: (hash: string) => any
  unapproveDonation: (hash: string) => any
  showApprovedDonations: boolean
  showUnapprovedDonations: boolean
  toggleShowApprovedDonations: () => any
  toggleShowUnapprovedDonations: () => any
}

const AdminView = ({
  donations,
  approveDonation,
  unapproveDonation,
  showApprovedDonations,
  showUnapprovedDonations,
  toggleShowApprovedDonations,
  toggleShowUnapprovedDonations
}: AdminViewProps) => {

  const sortedDonations = donations.sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className={STYLES.admin}>
      <ul className={STYLES.options}>
        <li><label><input type='checkbox' checked={showApprovedDonations} onChange={toggleShowApprovedDonations} />Display approved donations</label></li>
        <li><label><input type='checkbox' checked={showUnapprovedDonations} onChange={toggleShowUnapprovedDonations} />Display unapproved donations</label></li>
      </ul>
      <div className={STYLES.donations}>
        {donations.sort((a, b) => b.timestamp - a.timestamp).map(d => (
          <Donation
            key={d.hash}
            donation={d}
            onApprove={() => approveDonation(d.hash)}
            onUnapprove={() => unapproveDonation(d.hash)}
          />
        ))}
      </div>
    </div>
  )
}

export default AdminView
