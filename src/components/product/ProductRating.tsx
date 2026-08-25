import styles from './ProductRating.module.css'

interface ProductRatingProps {
  reviewCount?: number
}

export function ProductRating({ reviewCount = 0 }: ProductRatingProps) {
  return (
    <p className={styles.rating} aria-label={`${reviewCount} reviews`}>
      <span className={styles.stars} aria-hidden="true">
        ★★★★★
      </span>
      <span className={styles.count}>( {reviewCount} reviews )</span>
    </p>
  )
}
