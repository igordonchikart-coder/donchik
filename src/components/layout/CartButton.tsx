import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import cartBuy from '@/assets/ui/cart-buy.png'
import { useCart } from '@/hooks/useCart'
import styles from './CartButton.module.css'

export function CartButton() {
  const { totalQuantity } = useCart()

  return (
    <Link className={styles.button} to={routes.cart} aria-label={`Cart, ${totalQuantity} items`}>
      <img className={styles.icon} src={cartBuy} alt="" width={80} height={62} />
      {totalQuantity > 0 ? <span className={styles.badge}>{totalQuantity}</span> : null}
    </Link>
  )
}
