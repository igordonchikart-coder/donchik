import { useContext } from 'react'
import { CurrencyContext } from '@/context/CurrencyContext'

export function useDisplayCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useDisplayCurrency must be used inside CurrencyProvider')
  }
  return context
}
