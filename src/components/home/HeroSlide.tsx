import { Link } from 'react-router-dom'
import type { HeroSlide as HeroSlideData } from '@/data/heroSlides'
import styles from './HeroSlide.module.css'

interface HeroSlideProps {
  slide: HeroSlideData
  isActive: boolean
}

export function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <Link
      className={styles.slide}
      to={slide.to}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      aria-label={`${slide.title} ${slide.volumeLabel}`}
    >
      <img className={styles.image} src={slide.image} alt="" draggable={false} />
      <div className={styles.copy}>
        <p className={styles.title}>«{slide.title}»</p>
        <p className={styles.volume}>{slide.volumeLabel}</p>
      </div>
    </Link>
  )
}
