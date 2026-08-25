import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  as?: 'div' | 'section' | 'article'
  className?: string
}

export function Container({ children, as: Tag = 'div', className }: ContainerProps) {
  const classes = ['container', className].filter(Boolean).join(' ')
  return <Tag className={classes}>{children}</Tag>
}
