import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { items } from '@/data'
import type { ItemCategory } from '@/types/core'

const categories: Array<ItemCategory | 'All'> = ['All', 'Weapons', 'Armor', 'Accessories', 'Materials', 'Valuables']

export function CompendiumPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'All'>('All')

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return items.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory
      const searchMatch =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)

      return categoryMatch && searchMatch
    })
  }, [activeCategory, query])

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Compêndio de Itens</p>
        <h2 className="text-2xl font-semibold text-slate-100 md:text-3xl">Banco de dados pesquisável</h2>
        <p className="max-w-3xl text-sm text-slate-400">
          Busque por itens, filtre por categoria e abra detalhes completos com status base, upgrades e árvore de crafting.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome ou descrição..." />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{item.name}</CardTitle>
                <Badge variant="outline">{item.rarity}</Badge>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{item.category}</Badge>
                <Badge variant="outline">{item.foundIn.biome ?? item.foundIn.source}</Badge>
              </div>
              <Link className="text-sm font-medium text-violet-300 hover:text-violet-200" to={`/items/${item.id}`}>
                Ver detalhes completos →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {!filteredItems.length ? <p className="text-sm text-slate-400">Nenhum item encontrado para os filtros atuais.</p> : null}
    </section>
  )
}
