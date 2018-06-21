export interface APIDonationData {
  amount: string | null
  currencyCode: string
  donationDate: string
  donationRef: string | null
  donorDisplayName: string
  donorLocalAmount?: string
  donorLocalCurrencyCode?: string
  extimatedTaxReclaim?: number
  id: number
  image?: string
  message: string
  source: string
  thirdPartyReference: string | null
  charityId: number
}

export interface APIDonationDataWithExtraData extends APIDonationData {
  hash: string
  timestamp: number
  approved: boolean
}

export interface APIFundraiserInfo {
  eventName: string
  eventId: number
  currencySymbol: string
  currencyCode: string
  pageShortName: string
  title: string
  fundraisingTarget: string
  totalRaisedPercentageOfFundraisingTarget: string
  totalRaisedOffline: string
  totalRaisedOnline: string
  totalRaisedSms: string
  grandTotalRaisedExcludingGiftAid: string
  totalEstimatedGiftAid: string
  branding: {
    buttonColour: string
    buttonTextColour: string
    headerTextColour: string
    thermometerBackgroundColour: string
    thermometerFillColour: string
    thermometerTextColour: string
  }
  charity: {
    name: string
    description: string
    logoUrl: string
    logoAbsoluteUrl: string
    profilePageUrl: string
    registrationNumber: string
  }
  smsCode: string
  pageSummaryWhat: string
  pageSummaryWhy: string
  pageSummary: string
}

export interface APIDonationStreamDataPayload {
  info?: APIFundraiserInfo
  donations: APIDonationDataWithExtraData[]
}
