import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Container } from '@/components/common/Container'
import videoFrame from '@/assets/ui/video-frame.webp'
import { heroSlides } from '@/data/heroSlides'
import { HeroSlide } from './HeroSlide'
import { HeroSliderDots } from './HeroSliderDots'
import styles from './HeroSlider.module.css'

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = heroSlides.length

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
              {heroSlides.map((slide, index) => (
                <HeroSlide key={slide.id} slide={slide} isActive={index === activeIndex} />
              ))}
            </div>
            <HeroSliderDots slides={heroSlides} activeIndex={activeIndex} onSelect={goTo} />
          </div>
          <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
        </div>
      </Container>
    </section>
  )
}
