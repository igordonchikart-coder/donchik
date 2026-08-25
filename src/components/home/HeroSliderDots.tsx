import type { HeroSlide } from '@/data/heroSlides'
import styles from './HeroSliderDots.module.css'

interface HeroSliderDotsProps {
  slides: HeroSlide[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function HeroSliderDots({ slides, activeIndex, onSelect }: HeroSliderDotsProps) {
  return (
    <div className={styles.dots} role="tablist" aria-label="Hero slides">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={slide.id}
            className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${slide.title} ${slide.volumeLabel}`}
            onClick={() => onSelect(index)}
          />
        )
      })}
    </div>
  )
}
