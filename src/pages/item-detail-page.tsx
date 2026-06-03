import { Link, useParams } from 'react-router-dom'
import { items } from '@/data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ItemDetailPage() {
  const { itemId } = useParams()
  const item = items.find((entry) => entry.id === itemId)

  if (!item) {
    return (
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Item não encontrado</h2>
        <Link to="/" className="text-violet-300 hover:text-violet-200">
          Voltar para o compêndio
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Link to="/" className="text-sm text-violet-300 hover:text-violet-200">
          ← Voltar para o compêndio
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-3xl font-semibold text-slate-100">{item.name}</h2>
          <Badge>{item.rarity}</Badge>
          <Badge variant="outline">{item.category}</Badge>
        </div>
        <p className="max-w-3xl text-slate-400">{item.description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stats base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <p>Dano corpo a corpo: {item.baseStats.meleeDamage ?? 0}</p>
            <p>Dano à distância: {item.baseStats.rangedDamage ?? 0}</p>
            <p>Esquiva: {item.baseStats.dodge ?? 0}</p>
            <p>Armadura: {item.baseStats.armor ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bônus de upgrade</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
              {item.upgradeBonuses.map((bonus) => (
                <li key={bonus}>{bonus}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Onde encontrar</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-slate-300 md:grid-cols-3">
          <p>Bioma: {item.foundIn.biome ?? 'N/A'}</p>
          <p>Mob: {item.foundIn.mob ?? 'N/A'}</p>
          <p>Fonte: {item.foundIn.source}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Crafting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <p>Bancada necessária: {item.crafting.workstation}</p>
          <div>
            <p className="mb-2 font-medium text-slate-200">Materiais necessários</p>
            <ul className="list-inside list-disc space-y-1">
              {item.crafting.materials.length
                ? item.crafting.materials.map((material) => (
                    <li key={material.item}>
                      {material.item} x{material.quantity}
                    </li>
                  ))
                : 'Sem materiais diretos'}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-medium text-slate-200">Árvore de crafting</p>
            <ol className="list-inside list-decimal space-y-1">
              {item.crafting.tree.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
