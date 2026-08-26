import { useEffect, useRef, useState, type CSSProperties } from 'react'
import videoFrame from '@/assets/ui/video-frame.png'
import videoPause from '@/assets/ui/video-pause.png'
import videoPlay from '@/assets/ui/video-play.png'
import { homeVideo } from '@/data/homeVideo'
import styles from './VideoPlayer.module.css'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const rest = Math.floor(seconds % 60)
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

type WebkitDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void>
}

type WebkitElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>
}

export function VideoPlayer() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideTimer = useRef(0)
  const bezelTimer = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const lastVolume = useRef(1)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [bezel, setBezel] = useState<'play' | 'pause' | null>(null)
  const [bezelKey, setBezelKey] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  function revealControls() {
    setControlsVisible(true)
    window.clearTimeout(hideTimer.current)
    const video = videoRef.current
    if (video && !video.paused) {
      hideTimer.current = window.setTimeout(() => setControlsVisible(false), 1800)
    }
  }

  function flashBezel(kind: 'play' | 'pause') {
    setBezel(kind)
    setBezelKey((key) => key + 1)
    window.clearTimeout(bezelTimer.current)
    bezelTimer.current = window.setTimeout(() => setBezel(null), 1600)
  }

  async function togglePlay() {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.paused) {
      setEnded(false)
      if (started && !ended) {
        flashBezel('play')
      } else {
        setBezel(null)
        window.clearTimeout(bezelTimer.current)
      }
      await video.play()
    } else {
      flashBezel('pause')
      video.pause()
    }
  }

  function seek(value: number) {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.currentTime = value
    setCurrent(value)
  }

  function setVideoVolume(value: number) {
    const video = videoRef.current
    if (!video) {
      return
    }

    const next = Math.min(1, Math.max(0, value))
    video.volume = next
    video.muted = next === 0
    setVolume(next)
    setMuted(next === 0)
    if (next > 0) {
      lastVolume.current = next
    }
  }

  function toggleMute() {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.muted || video.volume === 0) {
      setVideoVolume(lastVolume.current > 0 ? lastVolume.current : 1)
      return
    }

    lastVolume.current = video.volume || 1
    video.muted = true
    setMuted(true)
  }

  async function toggleFullscreen() {
    const wrap = wrapRef.current
    if (!wrap) {
      return
    }

    const doc = document as WebkitDocument
    const fullscreenElement = doc.fullscreenElement ?? doc.webkitFullscreenElement
    if (fullscreenElement) {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen()
      } else {
        await doc.webkitExitFullscreen?.()
      }
      return
    }

    const el = wrap as HTMLDivElement & WebkitElement
    if (el.requestFullscreen) {
      await el.requestFullscreen()
    } else {
      await el.webkitRequestFullscreen?.()
    }
  }

  useEffect(() => {
    function syncFullscreen() {
      const doc = document as WebkitDocument
      setIsFullscreen(Boolean(doc.fullscreenElement ?? doc.webkitFullscreenElement))
    }

    document.addEventListener('fullscreenchange', syncFullscreen)
    document.addEventListener('webkitfullscreenchange', syncFullscreen)
    return () => {
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(bezelTimer.current)
      document.removeEventListener('fullscreenchange', syncFullscreen)
      document.removeEventListener('webkitfullscreenchange', syncFullscreen)
    }
  }, [])

  const idlePlay = (!started || ended) && bezel === null
  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div
      ref={wrapRef}
      className={`${styles.player} ${controlsVisible ? styles.playerActive : ''} ${!controlsVisible && playing ? styles.playerIdle : ''} ${isFullscreen ? styles.playerFullscreen : ''}`}
      onMouseMove={revealControls}
      onMouseLeave={() => {
        window.clearTimeout(hideTimer.current)
        if (playing) {
          setControlsVisible(false)
        }
      }}
    >
      <div className={styles.inner}>
        <video
          ref={videoRef}
          className={styles.video}
          src={homeVideo.src}
          poster={homeVideo.poster}
          playsInline
          preload="metadata"
          onPlay={() => {
            setPlaying(true)
            setStarted(true)
            setEnded(false)
            revealControls()
          }}
          onPause={() => {
            setPlaying(false)
            setControlsVisible(true)
          }}
          onEnded={() => {
            setPlaying(false)
            setEnded(true)
            setControlsVisible(true)
          }}
          onTimeUpdate={() => {
            const video = videoRef.current
            if (video) {
              setCurrent(video.currentTime)
            }
          }}
          onLoadedMetadata={() => {
            const video = videoRef.current
            if (video) {
              setDuration(video.duration)
            }
          }}
        />

        <button
          className={styles.hit}
          type="button"
          aria-label={playing ? 'Pause video' : homeVideo.label}
          onClick={togglePlay}
        />

        <div className={styles.bar}>
          <button className={styles.iconButton} type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={togglePlay}>
            <img className={styles.barGlyph} src={playing ? videoPause : videoPlay} alt="" draggable={false} />
          </button>

          <span className={styles.time}>{formatTime(current)}</span>

          <label className={styles.seekLabel}>
            <span className={styles.srOnly}>Seek</span>
            <span className={styles.seekTrack} style={{ '--progress': `${progress}%` } as CSSProperties}>
              <span className={styles.seekFill} />
              <span className={styles.seekThumb} />
            </span>
            <input
              className={styles.seek}
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={current}
              onChange={(event) => seek(Number(event.target.value))}
            />
          </label>

          <span className={styles.time}>{formatTime(duration)}</span>

          <div className={styles.sound}>
            <button className={styles.iconButton} type="button" aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              <svg
                className={`${styles.soundIcon} ${muted || volume === 0 ? styles.soundMuteMark : ''}`}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill="currentColor" d="M3.6 9.15h3.25L12 5.15v13.7l-5.15-3.8H3.6V9.15Z" />
                {muted || volume === 0 ? (
                  <g>
                    <path fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="square" d="M14.55 8.25 21.45 15.15" />
                    <path fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="square" d="M21.45 8.25 14.55 15.15" />
                  </g>
                ) : (
                  <path fill="currentColor" d="M13.65 9.5a3.35 3.35 0 0 1 0 5l-1.15-1.15a1.7 1.7 0 0 0 0-2.7l1.15-1.15Zm2.5-2.55a6.7 6.7 0 0 1 0 10.1l-1.2-1.2a5 5 0 0 0 0-7.7l1.2-1.2Z" />
                )}
              </svg>
            </button>
            <label className={styles.volumeLabel}>
              <span className={styles.srOnly}>Volume</span>
              <span className={styles.volumeTrack} style={{ '--progress': muted ? 0 : volume } as CSSProperties}>
                <span className={styles.volumeFill} />
                <span className={styles.volumeThumb} />
              </span>
              <input
                className={styles.volume}
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(event) => setVideoVolume(Number(event.target.value))}
              />
            </label>
          </div>

          <button className={styles.iconButton} type="button" aria-label="Full screen" onClick={toggleFullscreen}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M5 5h5.2v1.8H6.8V10H5V5Zm8.8 0H19v5h-1.8V6.8H13.8V5ZM5 14h1.8v3.2H10V19H5v-5Zm13.2 0H19v5h-5v-1.8h3.2V14Z" />
            </svg>
          </button>
        </div>

        {bezel ? (
          <img
            key={bezelKey}
            className={`${styles.centerIcon} ${styles.centerIconFlash}`}
            src={bezel === 'pause' ? videoPause : videoPlay}
            alt=""
            draggable={false}
          />
        ) : idlePlay ? (
          <img className={styles.centerIcon} src={videoPlay} alt="" draggable={false} />
        ) : null}
      </div>

      <img className={styles.frameImage} src={videoFrame} alt="" draggable={false} />
    </div>
  )
}
