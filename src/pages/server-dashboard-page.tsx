import { useNavigate } from 'react-router-dom'
import { serverData } from '@/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { setTeamAuthentication } from '@/routes/protected-route'

export function ServerDashboardPage() {
  const navigate = useNavigate()

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Server Dashboard</p>
          <h2 className="text-2xl font-semibold md:text-3xl">Área protegida da equipe</h2>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setTeamAuthentication(false)
            navigate('/team-login')
          }}
        >
          Sair
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Game ID Atual</CardTitle>
        </CardHeader>
        <CardContent className="text-lg font-semibold text-violet-300">{serverData.gameId}</CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quadro de avisos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            {serverData.notices.map((notice) => (
              <div key={notice.id} className="rounded-md border border-slate-800 bg-slate-950 p-3">
                <p className="font-medium text-slate-100">{notice.title}</p>
                <p>{notice.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marcações de mapa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            {serverData.markers.map((marker) => (
              <p key={marker.id}>
                {marker.label} em X: {marker.x}, Y: {marker.y}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
