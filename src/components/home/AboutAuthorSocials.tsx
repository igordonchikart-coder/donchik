import type { AboutAuthorSocial } from '@/data/aboutAuthor'
import { aboutAuthorSocials } from '@/data/aboutAuthor'
import styles from './AboutAuthorSocials.module.css'

function SocialIcon({ icon }: { icon: AboutAuthorSocial['icon'] }) {
  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M14.5 8.5V6.8c0-.8.5-1 1-1h1.7V3h-2.4C12.2 3 11 4.5 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path fill="currentColor" d="M10.5 9.5v5l5-2.5-5-2.5Z" />
    </svg>
  )
}

export function AboutAuthorSocials() {
  return (
    <ul className={styles.list}>
      {aboutAuthorSocials.map((item) => (
        <li key={item.id}>
          <a
            className={styles.link}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
          >
            <SocialIcon icon={item.icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}
