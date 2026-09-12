import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyImage } from '@/components/common/LazyImage'
import type { CtaSlide as CtaSlideData } from '@/data/ctaSlides'
import styles from './CtaSlide.module.css'

interface CtaSlideProps {
  slide: CtaSlideData
  isActive: boolean
  shouldMount?: boolean
}

export function CtaSlide({ slide, isActive, shouldMount = isActive }: CtaSlideProps) {
  const [mounted, setMounted] = useState(shouldMount)

  useEffect(() => {
    if (shouldMount) {
      setMounted(true)
    }
  }, [shouldMount])

  return (
    <Link
      className={styles.slide}
      to={slide.to}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      aria-label={slide.title || 'Discount offer'}
    >
      {mounted ? (
        <LazyImage className={styles.image} src={slide.image} alt="" eager={shouldMount} />
      ) : (
        <div className={styles.image} aria-hidden="true" />
      )}
    </Link>
  )
}
