import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import { useCart } from '@/hooks/useCart'
import styles from './CartButton.module.css'

export function CartButton() {
  const { totalQuantity } = useCart()

  return (
    <Link className={styles.button} to={routes.cart} aria-label={`Cart, ${totalQuantity} items`}>
      BUY
      {totalQuantity > 0 ? <span className={styles.badge}>{totalQuantity}</span> : null}
    </Link>
  )
}
