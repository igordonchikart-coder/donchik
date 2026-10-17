import { Link } from 'react-router-dom'
import { legalNavLinks } from '@/data/legalPages'
import { siteLegal } from '@/data/siteContacts'
import styles from './FooterLegal.module.css'

export function FooterLegal() {
  return (
    <div className={styles.legal}>
      <p className={styles.title}>Legal</p>
      <nav className={styles.links} aria-label="Legal">
        {legalNavLinks.map((item) => (
          <Link key={item.id} className={styles.link} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.meta}>
        <p>{siteLegal.copyright}</p>
        <p>{siteLegal.trademark}</p>
      </div>
    </div>
  )
}
