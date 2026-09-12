import type { MouseEvent } from 'react'
import styles from './SliderArrow.module.css'

interface SliderArrowProps {
  direction: 'prev' | 'next'
  label: string
  onClick: () => void
  className?: string
}

export function SliderArrow({ direction, label, onClick, className = '' }: SliderArrowProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    onClick()
    event.currentTarget.blur()
  }

  return (
    <button
      type="button"
      className={`${styles.arrow} ${direction === 'prev' ? styles.prev : styles.next} ${className}`}
      aria-label={label}
      onClick={handleClick}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {direction === 'prev' ? (
          <path
            d="M14.2 6.2 9 12l5.2 5.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9.8 6.2 15 12l-5.2 5.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}
