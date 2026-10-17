import { EUR_RATES, type DisplayCurrency } from './displayCurrency'

const CURRENCY_LOCALES: Record<string, string> = {
  RUB: 'ru-RU',
  USD: 'en-US',
  EUR: 'en-IE',
  KZT: 'ru-KZ',
  GBP: 'en-GB',
}

/** @deprecated use EUR_RATES.KZT — kept for older imports */
export const EUR_TO_KZT = EUR_RATES.KZT

const WHOLE_CURRENCIES = new Set(['KZT', 'USD', 'GBP'])

export function formatPrice(price: number, currency = 'RUB'): string {
  const locale = CURRENCY_LOCALES[currency] ?? 'ru-RU'
  const whole = WHOLE_CURRENCIES.has(currency)

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(price)
}

function toEur(price: number, sourceCurrency: string): number {
  if (sourceCurrency === 'EUR') {
    return price
  }
  if (sourceCurrency in EUR_RATES) {
    return price / EUR_RATES[sourceCurrency as DisplayCurrency]
  }
  return price
}

/** Round converted amounts to clean shop display values. */
export function convertFromEur(amountEur: number, to: DisplayCurrency): number {
  const raw = amountEur * EUR_RATES[to]
  if (to === 'KZT') {
    return Math.round(raw / 10) * 10
  }
  if (to === 'USD' || to === 'GBP') {
    return Math.round(raw)
  }
  return Math.round(raw * 100) / 100
}

/** Storefront display in the shopper-selected currency. */
export function formatStorePrice(
  price: number,
  sourceCurrency = 'EUR',
  displayCurrency: DisplayCurrency = 'KZT',
): string {
  const eur = toEur(price, sourceCurrency)
  return formatPrice(convertFromEur(eur, displayCurrency), displayCurrency)
}
