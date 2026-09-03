import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import cartBuy from '@/assets/ui/cart-buy.png'
import { useCart } from '@/hooks/useCart'
import styles from './CartButton.module.css'

export function CartButton() {
  const { totalQuantity, cartPulseId } = useCart()
  const [isPulsing, setIsPulsing] = useState(false)
  const prevPulseIdRef = useRef(cartPulseId)

  useEffect(() => {
    if (cartPulseId === prevPulseIdRef.current) {
      return
    }

    prevPulseIdRef.current = cartPulseId
    setIsPulsing(true)

    const timer = window.setTimeout(() => {
      setIsPulsing(false)
    }, 520)

    return () => window.clearTimeout(timer)
  }, [cartPulseId])

  return (
    <Link className={styles.button} to={routes.cart} aria-label={`Cart, ${totalQuantity} items`}>
      <img
        className={`${styles.icon} ${isPulsing ? styles.iconPulse : ''}`}
        src={cartBuy}
        alt=""
        width={80}
        height={62}
      />
      {totalQuantity > 0 ? (
        <span className={`${styles.badge} ${isPulsing ? styles.badgePulse : ''}`}>
          <span className={styles.badgeValue}>{totalQuantity}</span>
        </span>
      ) : null}
    </Link>
  )
}
