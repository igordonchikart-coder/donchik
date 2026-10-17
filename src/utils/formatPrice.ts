const CURRENCY_LOCALES: Record<string, string> = {
  RUB: 'ru-RU',
  USD: 'en-US',
  EUR: 'en-IE',
  KZT: 'ru-KZ',
}

/**
 * Temporary display rate for acquiring review.
 * Replace when the client / bank confirms the conversion source.
 */
export const EUR_TO_KZT = 560

export function formatPrice(price: number, currency = 'RUB'): string {
  const locale = CURRENCY_LOCALES[currency] ?? 'ru-RU'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'EUR' ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(price)
}

/** Storefront: primary KZT, foreign currency in parentheses when needed. */
export function formatStorePrice(price: number, currency = 'EUR'): string {
  if (currency === 'KZT') {
    return formatPrice(price, 'KZT')
  }

  if (currency === 'EUR') {
    const tenge = Math.round(price * EUR_TO_KZT)
    return `${formatPrice(tenge, 'KZT')} (${formatPrice(price, 'EUR')})`
  }

  return formatPrice(price, currency)
}
