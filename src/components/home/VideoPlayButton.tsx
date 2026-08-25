import styles from './VideoPlayButton.module.css'

interface VideoPlayButtonProps {
  label: string
}

export function VideoPlayButton({ label }: VideoPlayButtonProps) {
  return (
    <button className={styles.button} type="button" aria-label={label}>
      <span className={styles.ring} aria-hidden="true">
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 8.2v7.6L16.8 12 10 8.2Z" />
        </svg>
      </span>
    </button>
  )
}
