import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { useCart } from '@/hooks/useCart'
import { DEFAULT_CURRENCY } from '@/utils/constants'
import { formatPrice } from '@/utils/formatPrice'
import styles from './CartSummary.module.css'

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { items, totalPrice, totalQuantity } = useCart()
  const currency = items[0]?.currency ?? DEFAULT_CURRENCY

  return (
    <aside className={styles.summary} aria-label="Order summary">
      <p className={styles.row}>
        <span>Items</span>
        <span>{totalQuantity}</span>
      </p>
      <p className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <span>{formatPrice(totalPrice, currency)}</span>
      </p>
      {showCheckoutButton ? (
        <Button to={routes.checkout} disabled={items.length === 0}>
          Checkout
        </Button>
      ) : null}
    </aside>
  )
}
