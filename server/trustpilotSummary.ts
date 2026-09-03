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

const REVIEW_PAGE = 'https://www.trustpilot.com/review/not-toys.com'
const BUSINESS_UNIT_ID = '6599c419d3b1cafee3d1b0ce'
const WIDGET_URL = `https://widget.trustpilot.com/trustboxes/5419b6ffb0d04a076446a9af/index.html?templateId=5419b6ffb0d04a076446a9af&businessunitId=${BUSINESS_UNIT_ID}&locale=en-US`

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
}

function formatRating(value: number): string {
  return value.toFixed(1).replace('.', ',')
}

function parseSummary(html: string): TrustpilotSummary | null {
  const block = html.match(/"aggregateRating"\s*:\s*\{[^}]+\}/)
  const source = block?.[0] ?? html
  const ratingMatch = source.match(/"ratingValue"\s*:\s*"?([0-9]+(?:\.[0-9]+)?)"?/)
  const countMatch = source.match(/"reviewCount"\s*:\s*"?([0-9]+)"?/)

  if (!ratingMatch?.[1] || !countMatch?.[1]) {
    return null
  }

  const rating = Number(ratingMatch[1])
  const reviewCount = Number(countMatch[1])
  if (!Number.isFinite(rating) || !Number.isFinite(reviewCount) || reviewCount <= 0) {
    return null
  }

  return {
    rating,
    ratingLabel: formatRating(rating),
    reviewCount,
  }
}

async function readHtml(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { headers: BROWSER_HEADERS })
    if (!response.ok) {
      return null
    }
    return await response.text()
  } catch {
    return null
  }
}

export async function loadTrustpilotSummary(): Promise<TrustpilotSummary> {
  const pageHtml = await readHtml(REVIEW_PAGE)
  const fromPage = pageHtml ? parseSummary(pageHtml) : null
  if (fromPage) {
    return fromPage
  }

  const widgetHtml = await readHtml(WIDGET_URL)
  const fromWidget = widgetHtml ? parseSummary(widgetHtml) : null
  if (fromWidget) {
    return fromWidget
  }

  return TRUSTPILOT_FALLBACK
}
