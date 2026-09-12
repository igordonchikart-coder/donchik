import { useCallback, useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import { SliderArrow } from '@/components/common/SliderArrow'
import videoFrame from '@/assets/ui/video-frame.webp'
import { heroSlides as fallbackHeroSlides } from '@/data/heroSlides'
import {
  isNearCarouselIndex,
  useCarouselImageWarmup,
} from '@/hooks/useCarouselImageWarmup'
import { useHomepageSlides } from '@/hooks/useHomepageSlides'
import { useSwipeCarousel } from '@/hooks/useSwipeCarousel'
import { toHeroSlideView } from '@/utils/homepageSlides'
import { HeroSlide } from './HeroSlide'
import { HeroSliderDots } from './HeroSliderDots'
import styles from './HeroSlider.module.css'

export function HeroSlider() {
  const { data: dbSlides, isLoading } = useHomepageSlides('hero')
  const slides = useMemo(() => {
    if (dbSlides && dbSlides.length > 0) {
      return dbSlides.map(toHeroSlideView)
    }
    if (isLoading) {
      return []
    }
    return fallbackHeroSlides
  }, [dbSlides, isLoading])

  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = slides.length
  const imageUrls = useMemo(() => slides.map((slide) => slide.image), [slides])
  const { activeReady, safeIndex } = useCarouselImageWarmup(imageUrls, activeIndex)

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) {
        return
      }
      setActiveIndex(((index % slideCount) + slideCount) % slideCount)
    },
    [slideCount],
  )

  const onSwipe = useCallback(
    (direction: 'prev' | 'next') => {
      goTo(direction === 'next' ? safeIndex + 1 : safeIndex - 1)
    },
    [goTo, safeIndex],
  )
  const swipe = useSwipeCarousel(onSwipe, slideCount > 1 && activeReady)

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
  const showArrows = showTrack && slideCount > 1

  return (
    <section
      className={styles.section}
      aria-roledescription="carousel"
      aria-label="Featured books"
      aria-busy={!showTrack || undefined}
      onKeyDown={handleKeyDown}
    >
      <Container>
        <div className={styles.shell}>
          <div
            className={`sliderHost ${styles.viewport} ${showTrack ? '' : styles.viewportPending}`}
            {...swipe}
          >
            {showTrack ? (
              <div
                className={styles.track}
                style={{ transform: `translateX(-${safeIndex * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <HeroSlide
                    key={slide.id}
                    slide={slide}
                    isActive={index === safeIndex}
                    shouldMount={isNearCarouselIndex(index, safeIndex, slideCount)}
                  />
                ))}
              </div>
            ) : null}
            {showArrows ? (
              <>
                <SliderArrow direction="prev" label="Previous slide" onClick={() => goTo(safeIndex - 1)} />
                <SliderArrow direction="next" label="Next slide" onClick={() => goTo(safeIndex + 1)} />
              </>
            ) : null}
            {showTrack ? (
              <HeroSliderDots slides={slides} activeIndex={safeIndex} onSelect={goTo} />
            ) : null}
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
