import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { setTeamAuthentication } from '@/routes/team-auth'

export function TeamLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const nextRoute = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Login da equipe</CardTitle>
          <CardDescription>
            Estrutura inicial pronta para migração futura para Firebase Auth e sincronização em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              setTeamAuthentication(true)
              navigate(nextRoute)
            }}
          >
            Entrar com conta da equipe (mock)
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
