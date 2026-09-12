import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

const DEFAULT_INTERVAL_MS = 5000

/**
 * Auto-advance a carousel while its root is visible in the viewport.
 * Pauses off-screen and when prefers-reduced-motion is set.
 */
export function useVisibleSlideshow(
  rootRef: RefObject<Element | null>,
  slideCount: number,
  intervalMs = DEFAULT_INTERVAL_MS,
) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef(0)
  const countRef = useRef(slideCount)
  countRef.current = slideCount
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    setActiveIndex(0)
  }, [slideCount])

  useEffect(() => {
    const node = rootRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting))
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootRef])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = 0
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    if (reducedMotion.current || countRef.current < 2) {
      return
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => {
        const count = countRef.current
        if (count < 2) {
          return 0
        }
        return (current + 1) % count
      })
    }, intervalMs)
  }, [clearTimer, intervalMs])

  useEffect(() => {
    if (isVisible) {
      startTimer()
    } else {
      clearTimer()
    }
    return clearTimer
  }, [isVisible, startTimer, clearTimer, slideCount])

  const goTo = useCallback(
    (index: number) => {
      const count = countRef.current
      if (count === 0) {
        return
      }
      const next = ((index % count) + count) % count
      setActiveIndex(next)
      if (isVisible) {
        startTimer()
      }
    },
    [isVisible, startTimer],
  )

  const safeIndex = slideCount === 0 ? 0 : Math.min(activeIndex, slideCount - 1)

  return { activeIndex: safeIndex, goTo }
}
