import { TRUSTPILOT_FALLBACK } from '@/data/trustpilot'
import { fetchTrustpilotSummary } from '@/services/trustpilot'
import { useAsyncResource } from './useAsyncResource'

export function useTrustpilot() {
  const { data } = useAsyncResource(fetchTrustpilotSummary, 'trustpilot:summary')
  return data ?? TRUSTPILOT_FALLBACK
}
