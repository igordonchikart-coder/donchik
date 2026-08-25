import styles from './StateMessage.module.css'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <div className={styles.state} role="status" aria-live="polite">
      <p className={styles.text}>{label}</p>
    </div>
  )
}
