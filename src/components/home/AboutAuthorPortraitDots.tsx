import type { AboutAuthorPortrait } from '@/data/aboutAuthor'
import styles from './AboutAuthorPortraitDots.module.css'

interface AboutAuthorPortraitDotsProps {
  portraits: AboutAuthorPortrait[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function AboutAuthorPortraitDots({
  portraits,
  activeIndex,
  onSelect,
}: AboutAuthorPortraitDotsProps) {
  return (
    <div className={styles.dots} role="tablist" aria-label="Author photos">
      {portraits.map((portrait, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={portrait.id}
            className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Photo ${index + 1}`}
            onClick={() => onSelect(index)}
          />
        )
      })}
    </div>
  )
}
