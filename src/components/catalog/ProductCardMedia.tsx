import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import styles from './ProductCardMedia.module.css'

interface ProductCardMediaProps {
  product: Product
  image: string
  to: string
  comingSoon?: boolean
  children?: ReactNode
}

export function ProductCardMedia({ product, image, to, comingSoon, children }: ProductCardMediaProps) {
  return (
    <div className={styles.media}>
      <Link
        className={styles.imageWrap}
        to={to}
        tabIndex={-1}
        aria-label={`${product.title} ${product.volumeLabel}`}
      >
        <img className={styles.image} src={image} alt="" draggable={false} />
        {comingSoon && product.releaseYear ? <span className={styles.year}>{product.releaseYear}</span> : null}
      </Link>
      {children}
    </div>
  )
}
