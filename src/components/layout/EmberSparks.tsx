import { useEffect, useRef } from 'react'
import styles from './EmberSparks.module.css'

const DUST_COUNT = 56
const FRAME_MS = 40

interface Dust {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  heat: number
  twinkle: number
  twinkleSpeed: number
  depth: number
}

function canAnimate() {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    !window.matchMedia('(max-width: 768px)').matches
  )
}

function createDust(width: number, height: number, footerTop: number): Dust {
  const usableHeight = Math.max(height * 0.55, Math.min(footerTop, height) - 24)
  const depth = Math.random()

  return {
    x: Math.random() * width,
    y: Math.random() * usableHeight,
    vx: (Math.random() - 0.5) * (0.012 + depth * 0.02),
    vy: -(0.004 + Math.random() * 0.012) * (0.45 + depth * 0.7),
    size: 0.55 + depth * 1.35,
    heat: Math.random(),
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.0008 + Math.random() * 0.0018,
    depth,
  }
}

function dustFill(heat: number, alpha: number) {
  if (heat > 0.82) {
    return `rgba(255, 246, 220, ${alpha})`
  }
  if (heat > 0.45) {
    return `rgba(232, 196, 92, ${alpha})`
  }
  return `rgba(186, 148, 78, ${alpha})`
}

export function EmberSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canAnimate()) {
      return
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return
    }

    const surface = canvas
    const ctx = context

    let frame = 0
    let lastTime = performance.now()
    let lastDraw = 0
    let footerTick = 0
    let width = 0
    let height = 0
    let footerTop = Number.POSITIVE_INFINITY
    let dust: Dust[] = []
    let running = true

    function measureFooter() {
      const footer = document.querySelector('footer')
      const top = footer?.getBoundingClientRect().top
      footerTop = typeof top === 'number' ? top : height
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      width = window.innerWidth
      height = window.innerHeight
      surface.width = Math.floor(width * dpr)
      surface.height = Math.floor(height * dpr)
      surface.style.width = `${width}px`
      surface.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measureFooter()
      dust = Array.from({ length: DUST_COUNT }, () => createDust(width, height, footerTop))
    }

    function wrapDust(particle: Dust) {
      const maxY = Math.max(80, Math.min(footerTop, height) - 16)

      if (particle.x < -8) particle.x = width + 8
      if (particle.x > width + 8) particle.x = -8
      if (particle.y < -8) particle.y = maxY
      if (particle.y > maxY) particle.y = -8
    }

    function draw(now: number) {
      if (!running) {
        return
      }

      frame = window.requestAnimationFrame(draw)

      if (now - lastDraw < FRAME_MS) {
        return
      }

      const delta = Math.min(now - lastTime, 48)
      lastTime = now
      lastDraw = now

      footerTick += 1
      if (footerTick % 8 === 0) {
        measureFooter()
      }

      ctx.clearRect(0, 0, width, height)

      const hideBelow = Math.min(footerTop, height) - 8

      for (const particle of dust) {
        particle.twinkle += particle.twinkleSpeed * delta
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        wrapDust(particle)

        if (particle.y >= hideBelow) {
          continue
        }

        const pulse = 0.55 + Math.sin(particle.twinkle) * 0.45
        const alpha = (0.22 + particle.depth * 0.42) * pulse

        ctx.beginPath()
        ctx.fillStyle = dustFill(particle.heat, alpha)
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function onVisibility() {
      if (document.hidden) {
        running = false
        window.cancelAnimationFrame(frame)
        return
      }

      running = true
      lastTime = performance.now()
      lastDraw = 0
      frame = window.requestAnimationFrame(draw)
    }

    resize()
    frame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.layer} aria-hidden="true" />
}
