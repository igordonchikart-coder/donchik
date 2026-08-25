import { NavLink } from 'react-router-dom'
import styles from './NavDropdown.module.css'

export interface NavDropdownLink {
  label: string
  to: string
}

interface NavDropdownProps {
  id: string
  label: string
  items: NavDropdownLink[]
  isOpen: boolean
  orientation?: 'horizontal' | 'vertical'
  onToggle: (id: string) => void
  onNavigate?: () => void
}

export function NavDropdown({
  id,
  label,
  items,
  isOpen,
  orientation = 'horizontal',
  onToggle,
  onNavigate,
}: NavDropdownProps) {
  const menuId = `${id}-menu`

  return (
    <li className={`${styles.item} ${orientation === 'vertical' ? styles.itemVertical : ''}`}>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => onToggle(id)}
      >
        {label}
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen ? (
        <ul
          className={`${styles.menu} ${orientation === 'vertical' ? styles.menuVertical : styles.menuHorizontal}`}
          id={menuId}
        >
          {items.map((item) => (
            <li key={item.to}>
              <NavLink className={styles.link} to={item.to} onClick={onNavigate}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
