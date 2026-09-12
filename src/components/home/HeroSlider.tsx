import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import videoFrame from '@/assets/ui/video-frame.webp'
import { heroSlides as fallbackHeroSlides } from '@/data/heroSlides'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
import { toHeroSlideView } from '@/utils/homepageSlides'
import { HeroSlide } from './HeroSlide'
import { HeroSliderDots } from './HeroSliderDots'
import styles from './HeroSlider.module.css'

export function HeroSlider() {
  const { data: dbSlides } = useHomepageSlides('hero')
  const slides = useMemo(() => {
    if (dbSlides && dbSlides.length > 0) {
      return dbSlides.map(toHeroSlideView)
    }
    return fallbackHeroSlides
  }, [dbSlides])

  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = slides.length
  const safeIndex = slideCount === 0 ? 0 : Math.min(activeIndex, slideCount - 1)

  function goTo(index: number) {
    if (slideCount === 0) {
      return
    }
    const next = ((index % slideCount) + slideCount) % slideCount
    setActiveIndex(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(safeIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(safeIndex - 1)
    }
  }

  if (slideCount === 0) {
    return null
  }

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured books"
      onKeyDown={handleKeyDown}
    >
      <Container>
        <div className={styles.shell}>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <HeroSlide key={slide.id} slide={slide} isActive={index === safeIndex} />
              ))}
            </div>
            <HeroSliderDots slides={slides} activeIndex={safeIndex} onSelect={goTo} />
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
