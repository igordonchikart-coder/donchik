import { Link, useLocation } from 'react-router-dom'
import { routes } from '@/app/routes'
import { placeholders } from '@/data/placeholders'
import { SITE_NAME, SITE_TAGLINE } from '@/utils/constants'
import { handleHomeClick } from './goToPageStart'
import styles from './SiteBrand.module.css'

export function SiteBrand() {
  const { pathname } = useLocation()

  return (
    <Link className={styles.brand} to={routes.home} onClick={(event) => handleHomeClick(event, pathname)}>
      <img className={styles.mark} src={placeholders.logo} alt="" />
      <span className={styles.text}>
        <span className={styles.name}>{SITE_NAME}</span>
        <span className={styles.tagline}>{SITE_TAGLINE}</span>
      </span>
    </Link>
  )
}
