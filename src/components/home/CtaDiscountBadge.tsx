import styles from './CtaDiscountBadge.module.css'

interface CtaDiscountBadgeProps {
  label: string
}

export function CtaDiscountBadge({ label }: CtaDiscountBadgeProps) {
  return (
    <p className={styles.badge} aria-hidden="true">
      {label}
    </p>
  )
}
