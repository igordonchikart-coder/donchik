import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { useCart } from '@/hooks/useCart'
import { DEFAULT_CURRENCY } from '@/utils/constants'
import { useStorePrice } from '@/hooks/useStorePrice'
import styles from './CartSummary.module.css'

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { items, totalPrice, totalQuantity } = useCart()
  const formatStorePrice = useStorePrice()
  const currency = items[0]?.currency ?? DEFAULT_CURRENCY

  return (
    <aside className={styles.summary} aria-label="Order summary">
      <p className={styles.title}>Order summary</p>
      <p className={styles.row}>
        <span>Books</span>
        <span>{totalQuantity}</span>
      </p>
      <hr className={styles.divider} />
      <p className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <span>{formatStorePrice(totalPrice, currency)}</span>
      </p>
      {showCheckoutButton ? (
        <Button to={routes.checkout} disabled={items.length === 0}>
          Checkout
        </Button>
      ) : null}
    </aside>
  )
}
