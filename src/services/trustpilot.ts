import { TRUSTPILOT_FALLBACK, type TrustpilotSummary } from '@/data/trustpilot'

export async function fetchTrustpilotSummary(): Promise<TrustpilotSummary> {
  try {
    const response = await fetch('/api/trustpilot')
    if (!response.ok) {
      return TRUSTPILOT_FALLBACK
    }

    const data = (await response.json()) as Partial<TrustpilotSummary>
    if (
      typeof data.rating !== 'number' ||
      typeof data.ratingLabel !== 'string' ||
      typeof data.reviewCount !== 'number'
    ) {
      return TRUSTPILOT_FALLBACK
    }

    return {
      rating: data.rating,
      ratingLabel: data.ratingLabel,
      reviewCount: data.reviewCount,
    }
  } catch {
    return TRUSTPILOT_FALLBACK
  }
}
