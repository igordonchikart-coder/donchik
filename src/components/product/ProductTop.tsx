import type { Product } from '@/types'
import { ProductBuyPanel } from './ProductBuyPanel'
import { ProductMedia } from './ProductMedia'
import styles from './ProductTop.module.css'

interface ProductTopProps {
  product: Product
}

export function ProductTop({ product }: ProductTopProps) {
  return (
    <section className={styles.top} aria-labelledby="product-title">
      <ProductMedia product={product} />
      <ProductBuyPanel product={product} />
    </section>
  )
}
