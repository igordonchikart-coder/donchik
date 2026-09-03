import type { ReactNode } from 'react'
import styles from './PageProse.module.css'

interface PageProseProps {
  children: ReactNode
  className?: string
}

export function PageProse({ children, className }: PageProseProps) {
  const classes = [styles.prose, className].filter(Boolean).join(' ')
  return <div className={classes}>{children}</div>
}
