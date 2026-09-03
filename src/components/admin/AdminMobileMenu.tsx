import { AdminBrand } from './AdminBrand'
import navLine from '@/assets/ui/nav-line.png'
import { AdminSidebar } from './AdminSidebar'
import headerStyles from './AdminHeader.module.css'
import styles from './AdminMobileMenu.module.css'

interface AdminMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminMobileMenu({ isOpen, onClose }: AdminMobileMenuProps) {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
      role="presentation"
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        id="admin-mobile-menu"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Admin menu"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <AdminBrand onClick={onClose} />
          <button className={styles.close} type="button" onClick={onClose} aria-label="Close menu">
            <span className={styles.closeIcon} aria-hidden="true" />
          </button>
          <div className={headerStyles.navLineTrack} aria-hidden="true">
            <img className={headerStyles.navLine} src={navLine} alt="" draggable={false} />
          </div>
        </div>
        <div className={styles.body}>
          <AdminSidebar variant="drawer" onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}
