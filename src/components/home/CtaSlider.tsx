import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import { ctaSlides } from '@/data/ctaSlides'
import { CtaSlide } from './CtaSlide'
import { CtaSliderDots } from './CtaSliderDots'
import styles from './CtaSlider.module.css'

export function CtaSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = ctaSlides.length

  function goTo(index: number) {
    const next = ((index % slideCount) + slideCount) % slideCount
    setActiveIndex(next)
  }

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
        <div className={styles.frame}>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {ctaSlides.map((slide, index) => (
                <CtaSlide key={slide.id} slide={slide} isActive={index === activeIndex} />
              ))}
            </div>
          </div>
          <CtaSliderDots slides={ctaSlides} activeIndex={activeIndex} onSelect={goTo} />
        </div>
      </Container>
    </section>
  )
}
