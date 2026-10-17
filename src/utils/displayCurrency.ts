export const DISPLAY_CURRENCIES = ['EUR', 'USD', 'KZT', 'GBP'] as const

export type DisplayCurrency = (typeof DISPLAY_CURRENCIES)[number]

export const DISPLAY_CURRENCY_OPTIONS: Array<{ code: DisplayCurrency; label: string }> = [
  { code: 'KZT', label: 'KZT ₸' },
  { code: 'EUR', label: 'EUR €' },
  { code: 'USD', label: 'USD $' },
  { code: 'GBP', label: 'GBP £' },
]

/** Temporary display rates: 1 EUR → amount in target currency. */
export const EUR_RATES: Record<DisplayCurrency, number> = {
  EUR: 1,
  USD: 1.08,
  KZT: 560,
  GBP: 0.86,
}

export function isDisplayCurrency(value: string): value is DisplayCurrency {
  return (DISPLAY_CURRENCIES as readonly string[]).includes(value)
}
