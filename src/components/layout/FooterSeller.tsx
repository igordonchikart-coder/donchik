import { siteSeller } from '@/data/siteSeller'
import styles from './FooterSeller.module.css'

export function FooterSeller() {
  return (
    <div className={styles.seller}>
      <p className={styles.title}>Seller</p>
      <p>{siteSeller.legalName}</p>
      <p>{siteSeller.binIin}</p>
      <p>{siteSeller.legalAddress}</p>
      <p>
        Phone:{' '}
        <a className={styles.link} href={`tel:${siteSeller.phone.replace(/\s+/g, '')}`}>
          {siteSeller.phone}
        </a>
      </p>
      <p>
        Email:{' '}
        <a className={styles.link} href={`mailto:${siteSeller.email}`}>
          {siteSeller.email}
        </a>
      </p>
      <p className={styles.note}>{siteSeller.note}</p>
    </div>
  )
}
