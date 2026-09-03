import { useEffect, useState } from 'react'
import { Container } from '@/components/common/Container'
import navLine from '@/assets/ui/nav-line.png'
import { CartButton } from './CartButton'
import { MobileMenu } from './MobileMenu'
import { Navigation } from './Navigation'
import { SiteBrand } from './SiteBrand'
import styles from './Header.module.css'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <SiteBrand />
        <div className={styles.right}>
          <div className={styles.desktopNav}>
            <Navigation />
          </div>
          <CartButton />
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>
      <div className={styles.navLineTrack} aria-hidden="true">
        <Container>
          <img className={styles.navLine} src={navLine} alt="" draggable={false} />
        </Container>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
