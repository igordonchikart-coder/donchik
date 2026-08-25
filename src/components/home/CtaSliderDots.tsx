import type { CtaSlide } from '@/data/ctaSlides'
import styles from './CtaSliderDots.module.css'

interface CtaSliderDotsProps {
  slides: CtaSlide[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function CtaSliderDots({ slides, activeIndex, onSelect }: CtaSliderDotsProps) {
  return (
    <div className={styles.dots} role="tablist" aria-label="Discounted collections">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={slide.id}
            className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={slide.title}
            onClick={() => onSelect(index)}
          />
        )
      })}
    </div>
  )
}
