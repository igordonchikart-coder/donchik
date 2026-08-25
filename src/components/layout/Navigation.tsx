import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { routes } from '@/app/routes'
import { useCategories } from '@/hooks/useCategories'
import { handleHomeClick } from './goToPageStart'
import { NavDropdown } from './NavDropdown'
import styles from './Navigation.module.css'

interface NavigationProps {
  orientation?: 'horizontal' | 'vertical'
  onNavigate?: () => void
}

export function Navigation({ orientation = 'horizontal', onNavigate }: NavigationProps) {
  const { pathname } = useLocation()
  const { data: series } = useCategories()
  const [openId, setOpenId] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenId(null)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenId(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  function handleNavigate() {
    setOpenId(null)
    onNavigate?.()
  }

  const storeItems = [
    { label: 'Store', to: routes.catalog },
    ...(series ?? []).map((item) => ({
      label: item.title,
      to: routes.category(item.slug),
    })),
  ]

  return (
    <nav ref={navRef} aria-label="Main navigation">
      <ul className={`${styles.list} ${orientation === 'vertical' ? styles.vertical : ''}`}>
        <li>
          <NavLink
            className={styles.link}
            to={routes.home}
            onClick={(event) => {
              handleHomeClick(event, pathname)
              handleNavigate()
            }}
          >
            HOME
          </NavLink>
        </li>
        <NavDropdown
          id="store"
          label="STORE"
          items={storeItems}
          isOpen={openId === 'store'}
          orientation={orientation}
          onToggle={handleToggle}
          onNavigate={handleNavigate}
        />
        <li>
          <NavLink className={styles.link} to={routes.discounts} onClick={handleNavigate}>
            DISCOUNTS
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={routes.about} onClick={handleNavigate}>
            ABOUT US
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={routes.contact} onClick={handleNavigate}>
            CONTACT US
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
