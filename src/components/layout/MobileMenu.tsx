import { SiteBrand } from './SiteBrand'
import { Navigation } from './Navigation'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.panel}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.top}>
          <SiteBrand />
          <button className={styles.close} type="button" onClick={onClose} aria-label="Close menu">
            Close
          </button>
        </div>
        <Navigation orientation="vertical" onNavigate={onClose} />
      </div>
    </div>
  )
}
