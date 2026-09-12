import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import videoFrame from '@/assets/ui/video-frame.webp'
import { ctaSlides as fallbackCtaSlides } from '@/data/ctaSlides'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
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

  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = slides.length
  const safeIndex = slideCount === 0 ? 0 : Math.min(activeIndex, slideCount - 1)

  function goTo(index: number) {
    if (slideCount === 0) {
      return
    }
    setActiveIndex(((index % slideCount) + slideCount) % slideCount)
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
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <CtaSlide key={slide.id} slide={slide} isActive={index === safeIndex} />
              ))}
            </div>
            <CtaSliderDots slides={slides} activeIndex={safeIndex} onSelect={goTo} />
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
