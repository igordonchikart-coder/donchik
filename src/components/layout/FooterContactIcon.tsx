import type { SiteContact } from '@/data/siteContacts'
import styles from './FooterContactIcon.module.css'

interface FooterContactIconProps {
  icon: SiteContact['icon']
}

export function FooterContactIcon({ icon }: FooterContactIconProps) {
  if (icon === 'location') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        />
        <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
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
      <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="m4 7 8 6 8-6" />
    </svg>
  )
}
