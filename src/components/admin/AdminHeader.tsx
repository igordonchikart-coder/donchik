import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { useAuth } from '@/hooks/useAuth'
import { SITE_NAME } from '@/utils/constants'
import styles from './AdminHeader.module.css'

interface AdminHeaderProps {
  onMenuToggle: () => void
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className={styles.header}>
      <Link className={styles.brand} to={routes.admin}>
        {SITE_NAME} / Admin
      </Link>
      <div className={styles.actions}>
        {user ? <span className={styles.user}>{user.email}</span> : null}
        <Button variant="secondary" type="button" onClick={() => void logout()}>
          Log out
        </Button>
        <button className={styles.menuButton} type="button" onClick={onMenuToggle}>
          Menu
        </button>
      </div>
    </header>
  )
}
