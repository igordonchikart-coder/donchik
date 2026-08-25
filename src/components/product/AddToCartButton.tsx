import { Button } from '@/components/common/Button'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'
import { isPurchasable } from '@/utils/product'
import styles from './AddToCartButton.module.css'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const disabled = !isPurchasable(product)
  const label = disabled
    ? product.status === 'coming-soon'
      ? 'Coming soon'
      : 'Unavailable'
    : 'Buy'

  return (
    <Button className={styles.button} type="button" onClick={() => addItem(product)} disabled={disabled}>
      {disabled ? null : (
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            d="M6 7h15l-1.5 9h-12L5 4H2"
          />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" />
          <circle cx="17" cy="20" r="1.4" fill="currentColor" />
        </svg>
      )}
      {label}
    </Button>
  )
}
