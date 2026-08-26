import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyImage } from '@/components/common/LazyImage'
import type { CtaSlide as CtaSlideData } from '@/data/ctaSlides'
import { CtaDiscountBadge } from './CtaDiscountBadge'
import styles from './CtaSlide.module.css'

interface CtaSlideProps {
  slide: CtaSlideData
  isActive: boolean
}

export function CtaSlide({ slide, isActive }: CtaSlideProps) {
  const [loaded, setLoaded] = useState(isActive)

  useEffect(() => {
    if (isActive) {
      setLoaded(true)
    }
  }, [isActive])

  return (
    <Link
      className={styles.slide}
      to={slide.to}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      aria-label={`${slide.title}, ${slide.discountLabel}`}
    >
      {loaded ? (
        <LazyImage className={styles.image} src={slide.image} alt="" eager={isActive} />
      ) : (
        <div className={styles.image} aria-hidden="true" />
      )}
      <h3 className={styles.title}>{slide.title}</h3>
      <CtaDiscountBadge label={slide.discountLabel} />
    </Link>
  )
}
