import type { MouseEvent } from 'react'
import { routes } from '@/app/routes'

export function goToPageStart() {
  window.scrollTo(0, 0)
}

export function handleHomeClick(event: MouseEvent<HTMLAnchorElement>, pathname: string) {
  goToPageStart()
  if (pathname === routes.home) {
    event.preventDefault()
  }
}
