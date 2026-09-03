import { type FormEvent, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { TextField } from '@/components/common/Field'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/authService'
import { SITE_NAME } from '@/utils/constants'
import styles from './LoginOverlay.module.css'

interface LoginOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export const LOGIN_OVERLAY_CLOSE_MS = 280

export function LoginOverlay({ isOpen, onClose }: LoginOverlayProps) {
  const navigate = useNavigate()
  const { user, isLoading, login } = useAuth()
  const titleId = useId()
  const [isMounted, setIsMounted] = useState(isOpen)
  const [isShown, setIsShown] = useState(false)
  const [email, setEmail] = useState(authService.demoCredentials?.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      return
    }

    const scrollY = window.scrollY
    const { body } = document
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      window.scrollTo(0, scrollY)
    }
  }, [isMounted])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      const showFrame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsShown(true))
      })
      return () => window.cancelAnimationFrame(showFrame)
    }

    setIsShown(false)
    const hideTimer = window.setTimeout(() => setIsMounted(false), LOGIN_OVERLAY_CLOSE_MS)
    return () => window.clearTimeout(hideTimer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && !isLoading && user) {
      onClose()
      navigate(routes.admin)
    }
  }, [isLoading, isOpen, navigate, onClose, user])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login({ email, password })
      onClose()
      navigate(routes.admin)
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not sign in')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return createPortal(
    <div
      className={`${styles.overlay} ${isShown ? styles.overlayOpen : ''}`}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`${styles.dialog} ${isShown ? styles.dialogOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close login">
          <span className={styles.closeIcon} aria-hidden="true" />
        </button>

        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.eyebrow}>Studio access</p>
          <h2 className={styles.title} id={titleId}>
            {SITE_NAME}
          </h2>
          {authService.isMock ? (
            <p className={styles.hint}>
              Demo login: {authService.demoCredentials?.email} / {authService.demoCredentials?.password}
            </p>
          ) : (
            <p className={styles.hint}>Sign in with the studio account to edit the catalog.</p>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="username"
            required
            autoFocus={isOpen}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? (
            <p className="fieldError" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>,
    document.body,
  )
}
