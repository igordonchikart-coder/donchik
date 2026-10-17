import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import type { Product } from '@/types'
import { useStorePrice } from '@/hooks/useStorePrice'
import styles from './ProductCardFooter.module.css'

interface ProductCardFooterProps {
  product: Product
}

export function ProductCardFooter({ product }: ProductCardFooterProps) {
  const formatStorePrice = useStorePrice()

  return (
    <div className={styles.footer}>
      <Link className={styles.priceBlock} to={routes.product(product.slug)} tabIndex={-1}>
        {product.originalPrice ? (
          <span className={styles.original}>{formatStorePrice(product.originalPrice, product.currency)}</span>
        ) : null}
        <span className={styles.price}>{formatStorePrice(product.price, product.currency)}</span>
      </Link>
      {product.deliveryNote ? (
        <p className={styles.delivery}>
          <span aria-hidden="true">🔥</span> {product.deliveryNote.replace(/\bdelivery\b/i, 'Delivery')}
        </p>
      ) : null}
      {product.saleLabel ? <p className={styles.note}>{product.saleLabel}</p> : null}
    </div>
  )
}
