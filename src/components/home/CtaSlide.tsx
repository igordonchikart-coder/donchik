import { Link } from 'react-router-dom'
import type { CtaSlide as CtaSlideData } from '@/data/ctaSlides'
import { CtaDiscountBadge } from './CtaDiscountBadge'
import styles from './CtaSlide.module.css'

interface CtaSlideProps {
  slide: CtaSlideData
  isActive: boolean
}

export function CtaSlide({ slide, isActive }: CtaSlideProps) {
  return (
    <Link
      className={styles.slide}
      to={slide.to}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      aria-label={`${slide.title}, ${slide.discountLabel}`}
    >
      <img className={styles.image} src={slide.image} alt="" draggable={false} />
      <h3 className={styles.title}>{slide.title}</h3>
      <CtaDiscountBadge label={slide.discountLabel} />
    </Link>
  )
}
