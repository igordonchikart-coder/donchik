import { Link, useLocation } from 'react-router-dom'
import { routes } from '@/app/routes'
import brandDivider from '@/assets/ui/brand-divider.png'
import logo from '@/assets/ui/logo.webp'
import { SITE_NAME, SITE_TAGLINE } from '@/utils/constants'
import { handleHomeClick } from './goToPageStart'
import styles from './SiteBrand.module.css'

export function SiteBrand() {
  const { pathname } = useLocation()

  return (
    <Link className={styles.brand} to={routes.home} onClick={(event) => handleHomeClick(event, pathname)}>
      <img className={styles.mark} src={logo} alt="" width={152} height={152} decoding="async" fetchPriority="high" />
      <span className={styles.text}>
        <span className={styles.name}>{SITE_NAME}</span>
        <span className={styles.meta}>
          <img className={styles.divider} src={brandDivider} alt="" />
          <span className={styles.tagline}>{SITE_TAGLINE}</span>
        </span>
      </span>
    </Link>
  )
}
