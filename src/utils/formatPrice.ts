const CURRENCY_LOCALES: Record<string, string> = {
  RUB: 'ru-RU',
  USD: 'en-US',
  EUR: 'en-IE',
}

export function formatPrice(price: number, currency = 'RUB'): string {
  const locale = CURRENCY_LOCALES[currency] ?? 'ru-RU'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'EUR' ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(price)
}
