import { siteSeller } from '@/data/siteSeller'
import styles from './FooterSeller.module.css'

export function FooterSeller() {
  return (
    <div className={styles.seller}>
      <p className={styles.title}>Seller</p>
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.label}>Name</dt>
          <dd className={styles.value}>{siteSeller.legalName}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>BIN / IIN</dt>
          <dd className={styles.value}>{siteSeller.binIin}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Legal address</dt>
          <dd className={styles.value}>{siteSeller.legalAddress}</dd>
        </div>
      </dl>
    </div>
  )
}
