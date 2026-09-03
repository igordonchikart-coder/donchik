import { useCallback, useEffect, useRef, type DragEvent as ReactDragEvent, type PointerEvent as ReactPointerEvent } from 'react'

interface UseCardTiltOptions {
  maxTilt?: number
  disabled?: boolean
  /** Shine well insets as fractions of the flat shell (keeps light off the frame). */
  shineInsets?: { top: number; right: number; bottom: number; left: number }
}

const ENTER_EASE_MS = 520

/**
 * Flat shell for hit-testing; tilting plane holds frame + content + shine together.
 * Shine UVs are mapped from the flat shell so the hotspot stays under the cursor
 * on the card surface while the whole card tilts as one piece.
 */
export function useCardTilt<T extends HTMLElement>({
  maxTilt = 10,
  disabled = false,
  shineInsets,
}: UseCardTiltOptions = {}) {
  const tiltRef = useRef<T>(null)
  const shellRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useRef(false)
  const frameRef = useRef(0)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)
  const enterTimerRef = useRef(0)
  const shineInsetsRef = useRef(shineInsets)
  shineInsetsRef.current = shineInsets

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current)
      }
    }
  }, [])

  const setShine = useCallback((shell: HTMLElement, clientX: number, clientY: number, rect: DOMRect) => {
    const nx = (clientX - rect.left) / rect.width
    const ny = (clientY - rect.top) / rect.height
    const insets = shineInsetsRef.current

    let x = nx * 100
    let y = ny * 100
    if (insets) {
      x = ((nx - insets.left) / (1 - insets.left - insets.right)) * 100
      y = ((ny - insets.top) / (1 - insets.top - insets.bottom)) * 100
    }

    const clampedX = Math.min(100, Math.max(0, x))
    const clampedY = Math.min(100, Math.max(0, y))
    const well = shell.querySelector<HTMLElement>('[data-shine-well]')
    const target = well ?? shell
    target.style.setProperty('--shine-x', `${clampedX.toFixed(2)}%`)
    target.style.setProperty('--shine-y', `${clampedY.toFixed(2)}%`)
  }, [])

  const applyTilt = useCallback(() => {
    frameRef.current = 0
    const node = tiltRef.current
    const pending = pendingRef.current
    if (!node || !pending) {
      return
    }

    pendingRef.current = null
    const { x, y } = pending
    node.style.transform = `perspective(800px) rotateY(${(x * maxTilt).toFixed(2)}deg) rotateX(${(-y * maxTilt * 0.7).toFixed(2)}deg)`
  }, [maxTilt])

  const trackPointer = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (disabled || reducedMotion.current) {
        return
      }

      const shell = event.currentTarget
      const rect = shell.getBoundingClientRect()
      shellRef.current = shell

      // Shine follows the cursor immediately on the flat shell
      setShine(shell, event.clientX, event.clientY, rect)

      pendingRef.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      }

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(applyTilt)
      }
    },
    [applyTilt, disabled, setShine],
  )

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (disabled || reducedMotion.current) {
        return
      }

      const shell = event.currentTarget
      shellRef.current = shell

      delete shell.dataset.tilting
      shell.dataset.tiltEnter = 'true'

      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current)
      }
      enterTimerRef.current = window.setTimeout(() => {
        delete shell.dataset.tiltEnter
        shell.dataset.tilting = 'true'
        enterTimerRef.current = 0
      }, ENTER_EASE_MS)

      // Wait a frame so the slow enter transition is applied before the first tilt
      window.requestAnimationFrame(() => {
        trackPointer(event)
      })
    },
    [disabled, trackPointer],
  )

  const onPointerMove = trackPointer

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return
    }
    event.currentTarget.dataset.pressed = 'true'
  }, [])

  const onDragStart = useCallback((event: ReactDragEvent<HTMLElement>) => {
    event.preventDefault()
  }, [])

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    delete event.currentTarget.dataset.pressed
  }, [])

  const onPointerLeave = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
    }
    if (enterTimerRef.current) {
      window.clearTimeout(enterTimerRef.current)
      enterTimerRef.current = 0
    }
    pendingRef.current = null
    delete event.currentTarget.dataset.tilting
    delete event.currentTarget.dataset.tiltEnter
    delete event.currentTarget.dataset.pressed
    event.currentTarget.style.removeProperty('--shine-x')
    event.currentTarget.style.removeProperty('--shine-y')
    event.currentTarget.querySelector<HTMLElement>('[data-shine-well]')?.style.removeProperty('--shine-x')
    event.currentTarget.querySelector<HTMLElement>('[data-shine-well]')?.style.removeProperty('--shine-y')
    shellRef.current = null

    const node = tiltRef.current
    if (!node) {
      return
    }

    window.requestAnimationFrame(() => {
      node.style.transform = ''
    })
  }, [])

  return {
    tiltRef,
    onPointerEnter,
    onPointerMove,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onDragStart,
  }
}

/** Wait for the press-release bounce, then navigate. */
export function scheduleCardNavigation(navigate: () => void, delayMs = 150) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navigate()
    return
  }

  window.setTimeout(navigate, delayMs)
}
