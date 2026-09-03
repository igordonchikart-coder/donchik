import { type FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { TextField } from '@/components/common/Field'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/authService'
import { SITE_NAME } from '@/utils/constants'
import styles from './AdminLogin.module.css'

export function AdminLoginPage() {
  const { user, isLoading, login } = useAuth()
  const [email, setEmail] = useState(authService.demoCredentials?.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isLoading && user) {
    return <Navigate to={routes.admin} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login({ email, password })
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not sign in')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.login}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <p className={styles.eyebrow}>Studio access</p>
        <h1 className={styles.title}>{SITE_NAME}</h1>
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
  )
}
