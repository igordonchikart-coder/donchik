import { useMemo, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import videoFrame from '@/assets/ui/video-frame.webp'
import { heroSlides as fallbackHeroSlides } from '@/data/heroSlides'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
import { useVisibleSlideshow } from '@/hooks/useVisibleSlideshow'
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

  const sectionRef = useRef<HTMLElement>(null)
  const { activeIndex, goTo } = useVisibleSlideshow(sectionRef, slides.length)

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(activeIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(activeIndex - 1)
    }
  }

  if (slides.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
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
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <HeroSlide key={slide.id} slide={slide} isActive={index === activeIndex} />
              ))}
            </div>
            <HeroSliderDots slides={slides} activeIndex={activeIndex} onSelect={goTo} />
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
