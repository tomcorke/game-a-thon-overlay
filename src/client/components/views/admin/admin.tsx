import * as React from 'react'
import { APIDonationData } from '../../../../types/api'

import * as STYLES from './admin.scss'

interface DonationProps {
  donation: APIDonationData
  onApprove: () => any
  onUnapprove: () => any
}

const Donation = ({ donation, onApprove, onUnapprove }: DonationProps) => {

  const approveDisplay = donation.approved ?
    (
      <div>
        <div className={STYLES.approved}>APPROVED</div>
        <a className={STYLES.unapproveButton} onClick={onUnapprove}>Click to unapprove</a>
      </div>
    ) :
    <a className={STYLES.approveButton} onClick={onApprove}>Click to approve</a>

  return (
    <div className={STYLES.donation}>
      <div className={STYLES.date}>{new Date(donation.timestamp).toString()}</div>
      <div className={STYLES.amount}>{donation.amount} {donation.currency}</div>
      <div className={STYLES.donator}>{donation.name}</div>
      <div className={STYLES.message}>{donation.message}</div>
      {approveDisplay}
    </div>
  )
}

interface AdminViewProps {
  donations: APIDonationData[]
  approveDonation: (hash: string) => any
  unapproveDonation: (hash: string) => any
}

const AdminView = ({ donations, approveDonation, unapproveDonation }: AdminViewProps) => {
  return (
    <div className={STYLES.admin}>
      {donations.sort((a, b) => b.timestamp - a.timestamp).map(d => (
        <Donation
          key={d.hash}
          donation={d}
          onApprove={() => approveDonation(d.hash)}
          onUnapprove={() => unapproveDonation(d.hash)}
        />
      ))}
    </div>
  )
}

export default AdminView
