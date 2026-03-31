import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/authStore'
import { AppShell } from '@/components/layout/AppShell'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
