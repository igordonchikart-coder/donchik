import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import type { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import { useCart } from '@/hooks/useCart'
import styles from './CartItem.module.css'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <article className={styles.item}>
      <img className={styles.image} src={item.coverImage} alt={item.title} />
      <div className={styles.body}>
        <Link className={styles.title} to={routes.product(item.slug)}>
          {item.title}
        </Link>
        <p className={styles.meta}>per item: {formatPrice(item.price, item.currency)}</p>
        <p className={styles.price}>{formatPrice(item.price * item.quantity, item.currency)}</p>
        <div className={styles.controls}>
          <div className={styles.quantity}>
            <button
              className={styles.quantityButton}
              type="button"
              aria-label={`Decrease quantity of ${item.title}`}
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            >
              −
            </button>
            <span className={styles.quantityValue} aria-live="polite">{item.quantity}</span>
            <button
              className={styles.quantityButton}
              type="button"
              aria-label={`Increase quantity of ${item.title}`}
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>
          <button className={styles.remove} type="button" onClick={() => removeItem(item.productId)}>
            Remove
          </button>
        </div>
      </div>
    </article>
  )
}
