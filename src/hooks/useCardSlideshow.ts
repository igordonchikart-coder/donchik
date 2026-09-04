import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_INTERVAL_MS = 5000

function preloadImages(urls: string[]) {
  for (const url of urls) {
    if (!url) {
      continue
    }
    const image = new Image()
    image.decoding = 'async'
    image.src = url
  }
}

/**
 * Card slideshow: warm remaining slides on hover, auto-advance only while hovered.
 */
export function useCardSlideshow(slides: string[], intervalMs = DEFAULT_INTERVAL_MS) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [warmed, setWarmed] = useState(false)
  const slidesRef = useRef(slides)
  slidesRef.current = slides
  const timerRef = useRef(0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const slideKey = slides.join('\0')

  useEffect(() => {
    setActiveIndex(0)
    setWarmed(false)
  }, [slideKey])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = 0
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    if (reducedMotion.current || slidesRef.current.length < 2) {
      return
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => {
        const count = slidesRef.current.length
        if (count < 2) {
          return 0
        }
        return (current + 1) % count
      })
    }, intervalMs)
  }, [clearTimer, intervalMs])

  useEffect(() => () => clearTimer(), [clearTimer])

  const warmSlides = useCallback(() => {
    const urls = slidesRef.current
    if (urls.length < 2) {
      return
    }
    preloadImages(urls.slice(1))
    setWarmed(true)
  }, [])

  const onHoverStart = useCallback(() => {
    setHovered(true)
    warmSlides()
    startTimer()
  }, [startTimer, warmSlides])

  const onHoverEnd = useCallback(() => {
    setHovered(false)
    clearTimer()
    setActiveIndex(0)
  }, [clearTimer])

  const selectSlide = useCallback(
    (index: number) => {
      setActiveIndex(index)
      if (hovered) {
        startTimer()
      }
    },
    [hovered, startTimer],
  )

  const safeIndex = Math.min(activeIndex, Math.max(slides.length - 1, 0))

  return {
    activeIndex: safeIndex,
    warmed,
    onHoverStart,
    onHoverEnd,
    selectSlide,
  }
}
