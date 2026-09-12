import { useCallback, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'

const SWIPE_THRESHOLD_PX = 42

interface SwipeCarouselHandlers {
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerUp: (event: ReactPointerEvent<HTMLElement>) => void
  onPointerCancel: () => void
  onClickCapture: (event: ReactMouseEvent<HTMLElement>) => void
}

/** Horizontal swipe for carousels — ignores mostly-vertical gestures so the page can still scroll. */
export function useSwipeCarousel(
  onSwipe: (direction: 'prev' | 'next') => void,
  enabled = true,
): SwipeCarouselHandlers {
  const startX = useRef(0)
  const startY = useRef(0)
  const pointerId = useRef<number | null>(null)
  const axis = useRef<'undecided' | 'horizontal' | 'vertical'>('undecided')
  const didSwipe = useRef(false)

  const reset = useCallback(() => {
    pointerId.current = null
    axis.current = 'undecided'
  }, [])

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabled || event.button > 0) {
        return
      }
      // Skip mouse: desktop uses arrows/hover. Touch + pen get swipe.
      if (event.pointerType === 'mouse') {
        return
      }
      pointerId.current = event.pointerId
      startX.current = event.clientX
      startY.current = event.clientY
      axis.current = 'undecided'
      didSwipe.current = false
    },
    [enabled],
  )

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (pointerId.current !== event.pointerId || axis.current !== 'undecided') {
      return
    }

    const dx = event.clientX - startX.current
    const dy = event.clientY - startY.current
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      return
    }

    axis.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
    if (axis.current === 'horizontal') {
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        // Some browsers reject capture mid-gesture; swipe still works on up.
      }
    }
  }, [])

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (pointerId.current !== event.pointerId) {
        return
      }

      const dx = event.clientX - startX.current
      const horizontal = axis.current === 'horizontal' || (axis.current === 'undecided' && Math.abs(dx) >= SWIPE_THRESHOLD_PX)

      if (enabled && horizontal && Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(event.clientY - startY.current)) {
        didSwipe.current = true
        onSwipe(dx < 0 ? 'next' : 'prev')
      }

      reset()
    },
    [enabled, onSwipe, reset],
  )

  const onPointerCancel = useCallback(() => {
    reset()
  }, [reset])

  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (!didSwipe.current) {
      return
    }
    didSwipe.current = false
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
  }
}
