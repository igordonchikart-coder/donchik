import { Button } from './Button'
import styles from './StateMessage.module.css'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
}

export function EmptyState({ title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className={styles.state} role="status">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{description}</p>
      {actionLabel && actionTo ? <Button to={actionTo}>{actionLabel}</Button> : null}
    </div>
  )
}
