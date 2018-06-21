import { APIDonationData } from '../types/api'

interface Pagination {
  pageNumber: number
  pageSizeRequested: number
  pageSizeReturned: number
  totalPages: number
  totalResults: number
}

export interface DonationsEndpointResult {
  donations: APIDonationData[]
  id: string
  pageShortName: string
  pagination: Pagination
}

export interface MergedDonationsEndpointResult {
  donations: APIDonationData[]
}
