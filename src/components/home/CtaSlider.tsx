import { useMemo, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import videoFrame from '@/assets/ui/video-frame.webp'
import { ctaSlides as fallbackCtaSlides } from '@/data/ctaSlides'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
import { useVisibleSlideshow } from '@/hooks/useVisibleSlideshow'
import { toCtaSlideView } from '@/utils/homepageSlides'
import { CtaSlide } from './CtaSlide'
import { CtaSliderDots } from './CtaSliderDots'
import styles from './CtaSlider.module.css'

export function CtaSlider() {
  const { data: dbSlides } = useHomepageSlides('cta')
  const slides = useMemo(() => {
    if (dbSlides && dbSlides.length > 0) {
      return dbSlides.map(toCtaSlideView)
    }
    return fallbackCtaSlides
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
      aria-labelledby="cta-slider-title"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <Container>
        <h2 id="cta-slider-title" className={styles.heading}>
          Discounted book collections
        </h2>
        <div className={styles.shell}>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <CtaSlide key={slide.id} slide={slide} isActive={index === activeIndex} />
              ))}
            </div>
            <CtaSliderDots slides={slides} activeIndex={activeIndex} onSelect={goTo} />
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
