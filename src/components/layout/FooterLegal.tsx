import { siteLegal } from '@/data/siteContacts'
import styles from './FooterLegal.module.css'

export function FooterLegal() {
  return (
    <div className={styles.legal}>
      <p>{siteLegal.copyright}</p>
      <p>{siteLegal.trademark}</p>
    </div>
  )
}
