import { NavLink } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { routes } from '@/app/routes'
import { useAuth } from '@/hooks/useAuth'
import styles from './AdminSidebar.module.css'

const items = [
  { to: routes.admin, label: 'Overview', end: true },
  { to: routes.adminProducts, label: 'Books', end: false },
  { to: routes.adminCategories, label: 'Series', end: false },
  { to: routes.adminOrders, label: 'Orders', end: false },
]

interface AdminSidebarProps {
  variant?: 'rail' | 'drawer'
  onNavigate?: () => void
}

export function AdminSidebar({ variant = 'rail', onNavigate }: AdminSidebarProps) {
  const { logout } = useAuth()

  async function handleLogout() {
    onNavigate?.()
    await logout()
  }

  return (
    <aside
      className={`${styles.sidebar} ${variant === 'drawer' ? styles.drawer : ''}`}
      aria-label="Admin navigation"
    >
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <Button className={styles.logout} variant="secondary" type="button" onClick={() => void handleLogout()}>
          Log out
        </Button>
      </div>
    </aside>
  )
}
