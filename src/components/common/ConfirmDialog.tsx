import { Button } from './Button'
import styles from './ConfirmDialog.module.css'

interface ConfirmDialogProps {
  title: string
  description: string
  confirmLabel?: string
  isOpen: boolean
  isBusy?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Delete',
  isOpen,
  isBusy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onCancel}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.text}>{description}</p>
        <div className={styles.actions}>
          <Button variant="secondary" type="button" onClick={onCancel} disabled={isBusy}>
            Cancel
          </Button>
          <Button variant="danger" type="button" onClick={onConfirm} disabled={isBusy}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
