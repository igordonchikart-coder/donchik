import { SiteBrand } from './SiteBrand'
import { LoginButton } from './LoginButton'
import { Navigation } from './Navigation'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenLogin: () => void
}

export function MobileMenu({ isOpen, onClose, onOpenLogin }: MobileMenuProps) {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
      role="presentation"
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal={isOpen}
        aria-label="Mobile menu"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <SiteBrand />
          <button className={styles.close} type="button" onClick={onClose} aria-label="Close menu">
            <span className={styles.closeIcon} aria-hidden="true" />
          </button>
        </div>
        <Navigation orientation="vertical" onNavigate={onClose} />
        <div className={styles.account}>
          <LoginButton onClick={onOpenLogin} />
        </div>
      </div>
    </div>
  )
}
