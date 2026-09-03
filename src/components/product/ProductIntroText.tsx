import { applyTrustpilotRating } from '@/data/trustpilot'
import { TRUSTPILOT_URL } from '@/data/homeStats'
import styles from './ProductIntroText.module.css'

interface ProductIntroTextProps {
  text: string
  ratingLabel: string | null
}

export function ProductIntroText({ text, ratingLabel }: ProductIntroTextProps) {
  const resolved = ratingLabel ? applyTrustpilotRating(text, ratingLabel) : text
  const phrase = ratingLabel ? `${ratingLabel} Trustpilot rating` : null

  if (!phrase || !resolved.includes(phrase)) {
    return <p className={styles.intro}>{resolved}</p>
  }

  const [before, after] = resolved.split(phrase)

  return (
    <p className={styles.intro}>
      {before}
      <a className={styles.trustpilot} href={TRUSTPILOT_URL} target="_blank" rel="noreferrer">
        {phrase}
      </a>
      {after}
    </p>
  )
}
