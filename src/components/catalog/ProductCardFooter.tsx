import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import type { Product } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import styles from './ProductCardFooter.module.css'

interface ProductCardFooterProps {
  product: Product
}

export function ProductCardFooter({ product }: ProductCardFooterProps) {
  return (
    <div className={styles.footer}>
      <Link className={styles.priceBlock} to={routes.product(product.slug)} tabIndex={-1}>
        {product.originalPrice ? (
          <span className={styles.original}>{formatPrice(product.originalPrice, product.currency)}</span>
        ) : null}
        <span className={styles.price}>{formatPrice(product.price, product.currency)}</span>
      </Link>
      {product.deliveryNote ? <p className={styles.note}>{product.deliveryNote}</p> : null}
      {product.saleLabel ? <p className={styles.note}>{product.saleLabel}</p> : null}
    </div>
  )
}
