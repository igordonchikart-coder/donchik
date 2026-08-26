import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { LazyImage } from '@/components/common/LazyImage'
import { aboutAuthorPortraits } from '@/data/aboutAuthor'
import { AboutAuthorPortraitDots } from './AboutAuthorPortraitDots'
import styles from './AboutAuthorPortrait.module.css'

export function AboutAuthorPortrait() {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = aboutAuthorPortraits.length
  const active = aboutAuthorPortraits[activeIndex]

  function goTo(index: number) {
    const next = ((index % count) + count) % count
    setActiveIndex(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(activeIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(activeIndex - 1)
    }
  }

  if (!active) {
    return null
  }

  return (
    <div
      className={styles.root}
      aria-roledescription="carousel"
      aria-label="Author photos"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {aboutAuthorPortraits.map((portrait, index) =>
            index === activeIndex ? (
              <LazyImage
                key={portrait.id}
                className={styles.image}
                src={portrait.image}
                alt={portrait.alt}
                eager
              />
            ) : (
              <div key={portrait.id} className={styles.image} aria-hidden="true" />
            ),
          )}
        </div>
      </div>
      <AboutAuthorPortraitDots
        portraits={aboutAuthorPortraits}
        activeIndex={activeIndex}
        onSelect={goTo}
      />
    </div>
  )
}
