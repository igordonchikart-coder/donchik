export const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/not-toys.com'
export const TRUSTPILOT_BUSINESS_UNIT_ID = '6599c419d3b1cafee3d1b0ce'

export interface TrustpilotSummary {
  rating: number
  ratingLabel: string
  reviewCount: number
}

export const TRUSTPILOT_FALLBACK: TrustpilotSummary = {
  rating: 4.9,
  ratingLabel: '4,9',
  reviewCount: 321,
}

export function formatTrustpilotRating(value: number): string {
  return value.toFixed(1).replace('.', ',')
}

export function formatTrustpilotCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function applyTrustpilotRating(text: string, ratingLabel: string): string {
  return text.replace(/\d[.,]\d Trustpilot rating/gi, `${ratingLabel} Trustpilot rating`)
}
