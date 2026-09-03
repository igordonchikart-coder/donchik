import { loadTrustpilotSummary } from '../server/trustpilotSummary.js'

interface NodeResponse {
  setHeader: (name: string, value: string) => void
  status: (code: number) => { json: (body: unknown) => void }
}

export default async function handler(_request: unknown, response: NodeResponse) {
  const summary = await loadTrustpilotSummary()
  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  response.status(200).json(summary)
}
