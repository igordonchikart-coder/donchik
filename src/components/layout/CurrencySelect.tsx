import { useEffect, useId, useRef, useState } from 'react'
import { DISPLAY_CURRENCY_OPTIONS } from '@/utils/displayCurrency'
import { useDisplayCurrency } from '@/hooks/useDisplayCurrency'
import styles from './CurrencySelect.module.css'

interface CurrencySelectProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function CurrencySelect({ className = '', orientation = 'horizontal' }: CurrencySelectProps) {
  const { currency, setCurrency } = useDisplayCurrency()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const current = DISPLAY_CURRENCY_OPTIONS.find((option) => option.code === currency)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${orientation === 'vertical' ? styles.rootVertical : ''} ${className}`.trim()}
    >
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {current?.code ?? currency}
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen ? (
        <ul
          className={`${styles.menu} ${orientation === 'vertical' ? styles.menuVertical : styles.menuHorizontal}`}
          id={menuId}
          role="listbox"
          aria-label="Display currency"
        >
          {DISPLAY_CURRENCY_OPTIONS.map((option) => {
            const selected = option.code === currency
            return (
              <li key={option.code} role="presentation">
                <button
                  className={`${styles.option} ${selected ? styles.optionActive : ''}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setCurrency(option.code)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
