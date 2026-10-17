import { useCallback } from 'react'
import { formatStorePrice } from '@/utils/formatPrice'
import { useDisplayCurrency } from './useDisplayCurrency'

export function useStorePrice() {
  const { currency } = useDisplayCurrency()

  return useCallback(
    (price: number, sourceCurrency = 'EUR') => formatStorePrice(price, sourceCurrency, currency),
    [currency],
  )
}
