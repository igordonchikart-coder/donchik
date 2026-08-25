import type { ProductNotice } from '@/data/productNotices'
import styles from './ProductNoticeIcon.module.css'

interface ProductNoticeIconProps {
  icon: ProductNotice['icon']
}

export function ProductNoticeIcon({ icon }: ProductNoticeIconProps) {
  if (icon === 'box') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          d="M4 8.5 12 4l8 4.5v9L12 22 4 17.5v-9Z"
        />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M12 4v18M4 8.5l8 4.5 8-4.5" />
      </svg>
    )
  }

  if (icon === 'phone') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path fill="currentColor" d="M11 18h2v1.2h-2z" />
      </svg>
    )
  }

  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M4 12h16M12 4c2.4 2.2 3.6 5 3.6 8s-1.2 5.8-3.6 8c-2.4-2.2-3.6-5-3.6-8s1.2-5.8 3.6-8Z" />
    </svg>
  )
}
