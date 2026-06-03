import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { BestiaryPage } from '@/pages/bestiary-page'
import { BuildPlannerPage } from '@/pages/build-planner-page'
import { CompendiumPage } from '@/pages/compendium-page'
import { CookingSimulatorPage } from '@/pages/cooking-simulator-page'
import { ItemDetailPage } from '@/pages/item-detail-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ServerDashboardPage } from '@/pages/server-dashboard-page'
import { TeamLoginPage } from '@/pages/team-login-page'
import { ProtectedRoute } from '@/routes/protected-route'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<CompendiumPage />} />
          <Route path="/items/:itemId" element={<ItemDetailPage />} />
          <Route path="/build-planner" element={<BuildPlannerPage />} />
          <Route path="/cooking" element={<CookingSimulatorPage />} />
          <Route path="/bestiary" element={<BestiaryPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<ServerDashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/team-login" element={<TeamLoginPage />} />
        <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
