import { NavLink } from 'react-router-dom'
import { routes } from '@/app/routes'
import styles from './AdminSidebar.module.css'

const items = [
  { to: routes.admin, label: 'Overview', end: true },
  { to: routes.adminProducts, label: 'Books', end: false },
  { to: routes.adminCategories, label: 'Series', end: false },
  { to: routes.adminOrders, label: 'Orders', end: false },
]

interface AdminSidebarProps {
  onNavigate?: () => void
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Admin navigation">
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
    </aside>
  )
}
