import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LazyImage } from '@/components/common/LazyImage'
import type { Product } from '@/types'
import styles from './ProductCardMedia.module.css'

interface ProductCardMediaProps {
  product: Product
  image: string
  to?: string
  comingSoon?: boolean
  children?: ReactNode
}

export function ProductCardMedia({ product, image, to, comingSoon, children }: ProductCardMediaProps) {
  const media = (
    <>
      <LazyImage className={styles.image} src={image} alt="" />
      {comingSoon && product.releaseYear ? <span className={styles.year}>{product.releaseYear}</span> : null}
    </>
  )

  return (
    <div className={styles.media}>
      {comingSoon || !to ? (
        <div className={styles.imageWrap} aria-label={`${product.title} ${product.volumeLabel}`}>
          {media}
        </div>
      ) : (
        <Link className={styles.imageWrap} to={to} tabIndex={-1} aria-label={`${product.title} ${product.volumeLabel}`}>
          {media}
        </Link>
      )}
      {children}
    </div>
  )
}
