import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      <Link to="/" className="text-violet-300 hover:text-violet-200">
        Voltar para o início
      </Link>
    </section>
  )
}
