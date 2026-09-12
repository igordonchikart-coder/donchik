import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyImage } from '@/components/common/LazyImage'
import type { HeroSlide as HeroSlideData } from '@/data/heroSlides'
import styles from './HeroSlide.module.css'

interface HeroSlideProps {
  slide: HeroSlideData
  isActive: boolean
  shouldMount?: boolean
}

export function HeroSlide({ slide, isActive, shouldMount = isActive }: HeroSlideProps) {
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
      aria-label={`${slide.title} ${slide.volumeLabel}`}
    >
      {mounted ? (
        <LazyImage className={styles.image} src={slide.image} alt="" eager={shouldMount} />
      ) : (
        <div className={styles.image} aria-hidden="true" />
      )}
      <div className={styles.copy}>
        <p className={styles.title}>«{slide.title}»</p>
        <p className={styles.volume}>{slide.volumeLabel}</p>
      </div>
    </Link>
  )
}
