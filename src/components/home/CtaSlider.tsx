import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import videoFrame from '@/assets/ui/video-frame.webp'
import { ctaSlides as fallbackCtaSlides } from '@/data/ctaSlides'
import {
  isNearCarouselIndex,
  useCarouselImageWarmup,
} from '@/hooks/useCarouselImageWarmup'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
import { toCtaSlideView } from '@/utils/homepageSlides'
import { CtaSlide } from './CtaSlide'
import { CtaSliderDots } from './CtaSliderDots'
import styles from './CtaSlider.module.css'

export function CtaSlider() {
  const { data: dbSlides, isLoading } = useHomepageSlides('cta')
  const slides = useMemo(() => {
    if (dbSlides && dbSlides.length > 0) {
      return dbSlides.map(toCtaSlideView)
    }
    if (isLoading) {
      return []
    }
    return fallbackCtaSlides
  }, [dbSlides, isLoading])

  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = slides.length
  const imageUrls = useMemo(() => slides.map((slide) => slide.image), [slides])
  const { activeReady, safeIndex } = useCarouselImageWarmup(imageUrls, activeIndex)

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

  const showTrack = slideCount > 0 && activeReady

  return (
    <section
      className={styles.section}
      aria-labelledby="cta-slider-title"
      aria-roledescription="carousel"
      aria-busy={!showTrack || undefined}
      onKeyDown={handleKeyDown}
    >
      <Container>
        <h2 id="cta-slider-title" className={styles.heading}>
          Discounted book collections
        </h2>
        <div className={styles.shell}>
          <div className={`${styles.viewport} ${showTrack ? '' : styles.viewportPending}`}>
            {showTrack ? (
              <div
                className={styles.track}
                style={{ transform: `translateX(-${safeIndex * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <CtaSlide
                    key={slide.id}
                    slide={slide}
                    isActive={index === safeIndex}
                    shouldMount={isNearCarouselIndex(index, safeIndex, slideCount)}
                  />
                ))}
              </div>
            ) : null}
            {showTrack ? (
              <CtaSliderDots slides={slides} activeIndex={safeIndex} onSelect={goTo} />
            ) : null}
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
