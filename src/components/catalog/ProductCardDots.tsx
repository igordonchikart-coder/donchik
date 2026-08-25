import styles from './ProductCardDots.module.css'

interface ProductCardDotsProps {
  count: number
  activeIndex: number
  label: string
  onSelect: (index: number) => void
}

export function ProductCardDots({ count, activeIndex, label, onSelect }: ProductCardDotsProps) {
  if (count < 2) {
    return null
  }

  return (
    <div className={styles.dots} role="tablist" aria-label={`${label} images`}>
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={index}
            className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Image ${index + 1}`}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onSelect(index)
            }}
          />
        )
      })}
    </div>
  )
}
