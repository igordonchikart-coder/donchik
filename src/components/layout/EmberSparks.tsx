import { useEffect, useRef } from 'react'
import styles from './EmberSparks.module.css'

const DESKTOP_COUNT = 48
const MOBILE_COUNT = 26
const DESKTOP_FRAME_MS = 40
const MOBILE_FRAME_MS = 50

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  length: number
  heat: number
  twinkle: number
  twinkleSpeed: number
  depth: number
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 768px)').matches
}

function canAnimate() {
  if (typeof window === 'undefined') {
    return false
  }

  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function createEmber(width: number, height: number, footerTop: number): Ember {
  const usableHeight = Math.max(height * 0.55, Math.min(footerTop, height) - 24)
  const depth = Math.random()
  const size = 1.35 + depth * 2.8 + Math.random() * 1.1

  return {
    x: Math.random() * width,
    y: Math.random() * usableHeight,
    vx: (Math.random() - 0.5) * (0.018 + depth * 0.028),
    vy: -(0.01 + Math.random() * 0.028) * (0.55 + depth * 0.85),
    size,
    length: size * (9 + Math.random() * 11 + depth * 6),
    heat: Math.random(),
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.0009 + Math.random() * 0.0022,
    depth,
  }
}

/** Streak spark: bright tip, thin glowing body, fading tail — along travel direction. */
function drawSpark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vx: number,
  vy: number,
  size: number,
  length: number,
  heat: number,
  alpha: number,
) {
  const speed = Math.hypot(vx, vy) || 0.01
  const angle = Math.atan2(vy, vx)
  const streak = length * (0.85 + heat * 0.35) + speed * 420
  const halfThick = Math.max(0.45, size * (0.16 + heat * 0.1))
  const tip = streak * 0.42
  const tail = -streak * 0.58

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.globalCompositeOperation = 'lighter'

  const bloom = ctx.createRadialGradient(tip * 0.35, 0, 0, tip * 0.2, 0, streak * 0.55)
  bloom.addColorStop(0, `rgba(255, 210, 90, ${alpha * 0.22})`)
  bloom.addColorStop(0.45, `rgba(255, 110, 30, ${alpha * 0.1})`)
  bloom.addColorStop(1, 'rgba(160, 25, 8, 0)')
  ctx.fillStyle = bloom
  ctx.beginPath()
  ctx.ellipse(tip * 0.15, 0, streak * 0.5, halfThick * 4.5, 0, 0, Math.PI * 2)
  ctx.fill()

  const body = ctx.createLinearGradient(tail, 0, tip, 0)
  body.addColorStop(0, 'rgba(140, 18, 6, 0)')
  body.addColorStop(0.22, `rgba(220, 45, 12, ${alpha * 0.35})`)
  body.addColorStop(0.5, `rgba(255, 120, 28, ${alpha * 0.75})`)
  body.addColorStop(0.78, `rgba(255, 210, 80, ${alpha * 0.95})`)
  body.addColorStop(1, `rgba(255, 252, 235, ${Math.min(1, alpha * 1.15)})`)

  ctx.fillStyle = body
  ctx.beginPath()
  ctx.moveTo(tail, 0)
  ctx.quadraticCurveTo(tail * 0.2, -halfThick * 0.55, tip * 0.15, -halfThick)
  ctx.quadraticCurveTo(tip * 0.75, -halfThick * 0.35, tip, 0)
  ctx.quadraticCurveTo(tip * 0.75, halfThick * 0.35, tip * 0.15, halfThick)
  ctx.quadraticCurveTo(tail * 0.2, halfThick * 0.55, tail, 0)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = `rgba(255, 240, 180, ${alpha * 0.55})`
  ctx.lineWidth = Math.max(0.35, halfThick * 0.45)
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(tail * 0.35, 0)
  ctx.lineTo(tip * 0.92, 0)
  ctx.stroke()

  const tipGlow = ctx.createRadialGradient(tip * 0.88, 0, 0, tip * 0.88, 0, halfThick * 2.8)
  tipGlow.addColorStop(0, `rgba(255, 255, 245, ${Math.min(1, alpha * 1.35)})`)
  tipGlow.addColorStop(0.4, `rgba(255, 230, 120, ${alpha * 0.7})`)
  tipGlow.addColorStop(1, 'rgba(255, 140, 40, 0)')
  ctx.fillStyle = tipGlow
  ctx.beginPath()
  ctx.ellipse(tip * 0.88, 0, halfThick * 2.2, halfThick * 1.15, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
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
    let embers: Ember[] = []
    let running = true
    let mobile = isMobileViewport()
    let frameMs = mobile ? MOBILE_FRAME_MS : DESKTOP_FRAME_MS
    let count = mobile ? MOBILE_COUNT : DESKTOP_COUNT

    function measureFooter() {
      const footer = document.querySelector('footer')
      const top = footer?.getBoundingClientRect().top
      footerTop = typeof top === 'number' ? top : height
    }

    function resize() {
      mobile = isMobileViewport()
      frameMs = mobile ? MOBILE_FRAME_MS : DESKTOP_FRAME_MS
      count = mobile ? MOBILE_COUNT : DESKTOP_COUNT

      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.25)
      width = window.innerWidth
      height = window.innerHeight
      surface.width = Math.floor(width * dpr)
      surface.height = Math.floor(height * dpr)
      surface.style.width = `${width}px`
      surface.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measureFooter()
      embers = Array.from({ length: count }, () => createEmber(width, height, footerTop))
    }

    function wrapEmber(particle: Ember) {
      const maxY = Math.max(80, Math.min(footerTop, height) - 16)

      if (particle.x < -24) particle.x = width + 24
      if (particle.x > width + 24) particle.x = -24
      if (particle.y < -24) particle.y = maxY
      if (particle.y > maxY) particle.y = -24
    }

    function draw(now: number) {
      if (!running) {
        return
      }

      frame = window.requestAnimationFrame(draw)

      if (now - lastDraw < frameMs) {
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

      for (const particle of embers) {
        particle.twinkle += particle.twinkleSpeed * delta
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        // Gentle drift — embers flicker and wobble like rising ash
        particle.vx += Math.sin(particle.twinkle * 0.55) * 0.00035 * delta
        wrapEmber(particle)

        if (particle.y >= hideBelow) {
          continue
        }

        const pulse = 0.58 + Math.sin(particle.twinkle) * 0.42
        const alpha = (0.34 + particle.depth * 0.52) * pulse * (mobile ? 0.9 : 1)
        drawSpark(
          ctx,
          particle.x,
          particle.y,
          particle.vx,
          particle.vy,
          particle.size,
          particle.length,
          particle.heat,
          alpha,
        )
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
