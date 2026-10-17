import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { STORAGE_KEYS } from '@/utils/constants'
import { isDisplayCurrency, type DisplayCurrency } from '@/utils/displayCurrency'

interface CurrencyContextValue {
  currency: DisplayCurrency
  setCurrency: (currency: DisplayCurrency) => void
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null)

const DEFAULT_CURRENCY: DisplayCurrency = 'KZT'

function readStoredCurrency(): DisplayCurrency {
  if (typeof window === 'undefined') {
    return DEFAULT_CURRENCY
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.displayCurrency)
    if (stored && isDisplayCurrency(stored)) {
      return stored
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_CURRENCY
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<DisplayCurrency>(DEFAULT_CURRENCY)

  useEffect(() => {
    setCurrencyState(readStoredCurrency())
  }, [])

  const setCurrency = useCallback((next: DisplayCurrency) => {
    setCurrencyState(next)
    try {
      window.localStorage.setItem(STORAGE_KEYS.displayCurrency, next)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
    }),
    [currency, setCurrency],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
