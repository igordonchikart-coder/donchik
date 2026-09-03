import { Link } from 'react-router-dom'
import logo from '@/assets/ui/logo.webp'
import { routes } from '@/app/routes'
import { SITE_NAME } from '@/utils/constants'
import styles from './AdminHeader.module.css'

interface AdminBrandProps {
  onClick?: () => void
}

export function AdminBrand({ onClick }: AdminBrandProps) {
  return (
    <Link className={styles.brand} to={routes.admin} onClick={onClick}>
      <img className={styles.mark} src={logo} alt="" width={152} height={152} decoding="async" />
      <span className={styles.name}>{SITE_NAME}</span>
    </Link>
  )
}
