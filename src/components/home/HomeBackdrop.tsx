import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './HomeBackdrop.module.css'

const BEAMS = ['beamA', 'beamB', 'beamC', 'beamD'] as const
const PARACHUTISTS = ['paraA', 'paraB', 'paraC', 'paraD'] as const
const AIRSHIPS = ['shipA', 'shipB'] as const

export function HomeBackdrop() {
  const groundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ground = groundRef.current
    if (!ground) {
      return
    }

    let frame = 0
    let lastLift = -1

    function placeOnFooter() {
      frame = 0
      const footer = document.querySelector('footer')
      if (!footer) {
        if (lastLift !== 0) {
          lastLift = 0
          ground.style.transform = ''
        }
        return
      }

      const lift = Math.max(0, Math.round(window.innerHeight - footer.getBoundingClientRect().top))
      if (lift === lastLift) {
        return
      }
      lastLift = lift
      ground.style.transform = lift > 0 ? `translate3d(0, ${-lift}px, 0)` : ''
    }

    function onScroll() {
      if (frame) {
        return
      }
      frame = window.requestAnimationFrame(placeOnFooter)
    }

    placeOnFooter()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className={styles.scene} aria-hidden="true">
      {AIRSHIPS.map((ship) => (
        <div key={ship} className={`${styles.airship} ${styles[ship]}`}>
          <img
            className={ship === 'shipA' ? styles.faceRight : undefined}
            src="/Airship.png"
            alt=""
            draggable={false}
          />
        </div>
      ))}
      {PARACHUTISTS.map((para) => (
        <img
          key={para}
          className={`${styles.para} ${styles[para]}`}
          src="/Parachutist.png"
          alt=""
          draggable={false}
        />
      ))}
      <div ref={groundRef} className={styles.ground}>
        {BEAMS.map((beam) => (
          <img
            key={beam}
            className={`${styles.beam} ${styles[beam]}`}
            src="/searchlights-lit.png"
            alt=""
            draggable={false}
          />
        ))}
        <img className={styles.city} src="/City.png" alt="" draggable={false} />
      </div>
    </div>,
    document.body,
  )
}
