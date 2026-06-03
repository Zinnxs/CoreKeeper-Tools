import { bestiaryEntries } from '@/data'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function BestiaryPage() {
  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Bestiary</p>
        <h2 className="text-2xl font-semibold md:text-3xl">Chefes e inimigos relevantes</h2>
      </header>

      <div className="grid gap-4">
        {bestiaryEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{entry.name}</CardTitle>
                <Badge variant="secondary">{entry.type}</Badge>
                <Badge variant="outline">{entry.biome}</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-slate-300 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-3">
                <div>
                  <p className="mb-1 font-medium text-slate-100">Padrões de ataque</p>
                  <ul className="list-inside list-disc space-y-1">
                    {entry.attackPatterns.map((pattern) => (
                      <li key={pattern}>{pattern}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-medium text-slate-100">Estratégia de invocação</p>
                  <p>{entry.summonStrategy}</p>
                </div>
              </div>

              <div>
                <p className="mb-1 font-medium text-slate-100">Tabela de loot</p>
                <ul className="space-y-1">
                  {entry.lootTable.map((loot) => (
                    <li key={`${loot.item}-${loot.dropRate}`}>
                      {loot.item} — {loot.dropRate}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
