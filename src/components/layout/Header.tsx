import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Container } from '@/components/common/Container'
import navLine from '@/assets/ui/nav-line.png'
import { CartButton } from './CartButton'
import { LoginButton } from './LoginButton'
import { LoginOverlay, LOGIN_OVERLAY_CLOSE_MS } from './LoginOverlay'
import { MobileMenu } from './MobileMenu'
import { Navigation } from './Navigation'
import { SiteBrand } from './SiteBrand'
import styles from './Header.module.css'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isHeaderPinned, setIsHeaderPinned] = useState(false)
  const [lockHeight, setLockHeight] = useState(0)

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

  useLayoutEffect(() => {
    if (isLoginOpen) {
      setLockHeight(headerRef.current?.getBoundingClientRect().height ?? 0)
      setIsHeaderPinned(true)
      return
    }

    const releaseTimer = window.setTimeout(() => {
      setIsHeaderPinned(false)
      setLockHeight(0)
    }, LOGIN_OVERLAY_CLOSE_MS + 20)

    return () => window.clearTimeout(releaseTimer)
  }, [isLoginOpen])

  function openLogin() {
    setIsMenuOpen(false)
    setIsLoginOpen(true)
  }

  function toggleLogin() {
    setIsMenuOpen(false)
    setIsLoginOpen((current) => !current)
  }

  return (
    <>
      {lockHeight > 0 ? <div className={styles.headerSpacer} style={{ height: lockHeight }} aria-hidden /> : null}
      <header
        ref={headerRef}
        className={`${styles.header} ${isHeaderPinned ? styles.headerPinned : ''}`}
      >
        <Container className={styles.inner}>
          <SiteBrand />
          <div className={styles.desktopNav}>
            <Navigation />
          </div>
          <div className={styles.tools}>
            <span className={styles.loginWrap}>
              <LoginButton onClick={toggleLogin} />
            </span>
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
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onOpenLogin={openLogin}
        />
      </header>
      <LoginOverlay isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
