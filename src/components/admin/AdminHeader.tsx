import { AdminBrand } from './AdminBrand'
import navLine from '@/assets/ui/nav-line.png'
import styles from './AdminHeader.module.css'

interface AdminHeaderProps {
  isMenuOpen: boolean
  onMenuOpen: () => void
}

export function AdminHeader({ isMenuOpen, onMenuOpen }: AdminHeaderProps) {
  return (
    <header className={styles.header}>
      <AdminBrand />
      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="admin-mobile-menu"
        aria-label="Open menu"
        onClick={onMenuOpen}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <div className={styles.navLineTrack} aria-hidden="true">
        <img className={styles.navLine} src={navLine} alt="" draggable={false} />
      </div>
    </header>
  )
}
