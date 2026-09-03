import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './SelectDropdown.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectDropdownProps {
  id: string
  name?: string
  value: string
  options: SelectOption[]
  disabled?: boolean
  required?: boolean
  compact?: boolean
  labelledBy?: string
  ariaLabel?: string
  onChange: (value: string) => void
}

const MENU_GAP = 6
const MENU_MAX_HEIGHT = 256

export function SelectDropdown({
  id,
  name,
  value,
  options,
  disabled = false,
  required = false,
  compact = false,
  labelledBy,
  ariaLabel,
  onChange,
}: SelectDropdownProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)
  const [menuBox, setMenuBox] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null)
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )
  const [activeIndex, setActiveIndex] = useState(selectedIndex)
  const selected = options.find((option) => option.value === value) ?? options[0]

  const enabledIndexes = useMemo(
    () => options.map((option, index) => (option.disabled ? -1 : index)).filter((index) => index >= 0),
    [options],
  )

  function updateMenuBox() {
    const trigger = triggerRef.current
    if (!trigger) {
      return
    }

    const rect = trigger.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP - 12
    const spaceAbove = rect.top - MENU_GAP - 12
    const openUp = spaceBelow < 160 && spaceAbove > spaceBelow
    const maxHeight = Math.min(MENU_MAX_HEIGHT, Math.max(openUp ? spaceAbove : spaceBelow, 120))
    const top = openUp ? rect.top - MENU_GAP - maxHeight : rect.bottom + MENU_GAP

    setMenuBox({
      top,
      left: rect.left,
      width: rect.width,
      maxHeight,
    })
  }

  useLayoutEffect(() => {
    if (!open) {
      return
    }

    setActiveIndex(selectedIndex)
    updateMenuBox()
    const onReposition = () => updateMenuBox()
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
  }, [open, selectedIndex])

  useEffect(() => {
    if (!open) {
      return
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return
      }
      setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const option = menuRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
    option?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  function move(step: number) {
    if (enabledIndexes.length === 0) {
      return
    }

    const current = enabledIndexes.indexOf(activeIndex)
    const next = enabledIndexes[(current + step + enabledIndexes.length) % enabledIndexes.length]
    setActiveIndex(next)
  }

  function choose(index: number) {
    const option = options[index]
    if (!option || option.disabled) {
      return
    }
    onChange(option.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={triggerRef}
        id={id}
        name={name}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''} ${compact ? styles.triggerCompact : ''}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy}
        aria-label={ariaLabel}
        aria-required={required || undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            if (!open) {
              setOpen(true)
              return
            }
            move(event.key === 'ArrowDown' ? 1 : -1)
          }
          if (event.key === 'Enter' || event.key === ' ') {
            if (open) {
              event.preventDefault()
              choose(activeIndex)
            }
          }
          if (event.key === 'Tab' && open) {
            setOpen(false)
          }
          if (event.key === 'Escape' && open) {
            event.preventDefault()
            setOpen(false)
          }
        }}
      >
        <span className={styles.value}>{selected?.label ?? ''}</span>
        <span className={styles.chevron} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6.2L8 10.2L12 6.2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && menuBox
        ? createPortal(
            <ul
              ref={menuRef}
              className={styles.menu}
              id={listId}
              role="listbox"
              style={{
                top: menuBox.top,
                left: menuBox.left,
                width: menuBox.width,
                maxHeight: menuBox.maxHeight,
              }}
            >
              {options.map((option, index) => {
                const isSelected = option.value === value
                const isActive = index === activeIndex

                return (
                  <li key={option.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      data-index={index}
                      className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${isActive ? styles.optionActive : ''}`}
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => choose(index)}
                    >
                      <span>{option.label}</span>
                      {isSelected ? (
                        <svg className={styles.optionMark} viewBox="0 0 12 10" fill="none" aria-hidden="true">
                          <path
                            d="M1.5 5.2L4.4 8.1L10.5 1.8"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>,
            document.body,
          )
        : null}
    </div>
  )
}
