import { Link } from 'react-router-dom'
import { siteSeller } from '@/data/siteSeller'
import { legalNavLinks } from '@/data/legalPages'
import { SITE_NAME } from '@/utils/constants'
import styles from './AboutCompany.module.css'

export function AboutCompany() {
  return (
    <section className={styles.section} aria-labelledby="about-company-title">
      <h2 id="about-company-title" className={styles.title}>
        About the company
      </h2>
      <p className={styles.lead}>
        {SITE_NAME} is the official store for WWII reference books by Igor Donchik. Books are packed
        and shipped from Estonia.
      </p>

      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.label}>Seller</dt>
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
        <div className={styles.row}>
          <dt className={styles.label}>Warehouse</dt>
          <dd className={styles.value}>{siteSeller.shippingAddress}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Phone</dt>
          <dd className={styles.value}>
            <a href={`tel:${siteSeller.phone.replace(/\s+/g, '')}`}>{siteSeller.phone}</a>
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Email</dt>
          <dd className={styles.value}>
            <a href={`mailto:${siteSeller.email}`}>{siteSeller.email}</a>
          </dd>
        </div>
      </dl>

      <nav className={styles.links} aria-label="Legal documents">
        {legalNavLinks.map((item) => (
          <Link key={item.id} className={styles.link} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  )
}
