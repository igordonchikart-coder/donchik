import { formatTrustpilotCount } from '@/data/trustpilot'
import { TRUSTPILOT_URL } from '@/data/homeStats'
import { useTrustpilot } from '@/hooks/useTrustpilot'
import styles from './ProductRating.module.css'

export function ProductRating() {
  const { ratingLabel, reviewCount } = useTrustpilot()
  const reviews = formatTrustpilotCount(reviewCount)

  return (
    <a
      className={styles.rating}
      href={TRUSTPILOT_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`${ratingLabel} Trustpilot Rating, ${reviews} reviews`}
    >
      <span className={styles.stars} aria-hidden="true">
        ★★★★★
      </span>
      <span className={styles.score}>{ratingLabel}</span>
      <span className={styles.count}>({reviews} reviews)</span>
    </a>
  )
}
