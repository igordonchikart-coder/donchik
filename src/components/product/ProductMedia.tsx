import { ProductGallery } from './ProductGallery'
import { ProductRating } from './ProductRating'
import type { Product } from '@/types'
import styles from './ProductMedia.module.css'

interface ProductMediaProps {
  product: Product
}

export function ProductMedia({ product }: ProductMediaProps) {
  return (
    <div className={styles.media}>
      <ProductGallery key={product.id} product={product} />
      <ProductRating />
    </div>
  )
}
