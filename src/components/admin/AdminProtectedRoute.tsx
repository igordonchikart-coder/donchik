import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '@/app/routes'
import { LoadingState } from '@/components/common/LoadingState'
import { useAuth } from '@/hooks/useAuth'

export function AdminProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingState label="Checking access..." />
  }

  if (!user) {
    return <Navigate to={routes.adminLogin} replace />
  }

  return <Outlet />
}
