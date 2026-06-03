import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isTeamAuthenticated } from '@/routes/team-auth'

export function ProtectedRoute() {
  const location = useLocation()

  if (!isTeamAuthenticated()) {
    return <Navigate to="/team-login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
