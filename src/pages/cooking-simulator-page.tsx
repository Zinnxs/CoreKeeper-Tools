import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cookingIngredients, cookingRecipes } from '@/data'

export function CookingSimulatorPage() {
  const [firstIngredient, setFirstIngredient] = useState(cookingIngredients[0] ?? '')
  const [secondIngredient, setSecondIngredient] = useState(cookingIngredients[1] ?? '')

  const selectedRecipe = useMemo(() => {
    const key = [firstIngredient, secondIngredient].sort().join('|')

    return cookingRecipes.find((recipe) => recipe.ingredients.slice().sort().join('|') === key)
  }, [firstIngredient, secondIngredient])

  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Cooking Simulator</p>
        <h2 className="text-2xl font-semibold md:text-3xl">Combinação de 2 ingredientes</h2>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Selecione os ingredientes</CardTitle>
          <CardDescription>Estrutura preparada para expansão com dados completos da wiki.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <select
            value={firstIngredient}
            onChange={(event) => setFirstIngredient(event.target.value)}
            className="h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
          >
            {cookingIngredients.map((ingredient) => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>

          <select
            value={secondIngredient}
            onChange={(event) => setSecondIngredient(event.target.value)}
            className="h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
          >
            {cookingIngredients.map((ingredient) => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-300">
          {selectedRecipe ? (
            <>
              <p className="text-base font-semibold text-slate-100">{selectedRecipe.result}</p>
              <p>Buffs: {selectedRecipe.buffs.join(', ')}</p>
              <p>Duração: {selectedRecipe.duration}</p>
              <p>Raridade: {selectedRecipe.rarity}</p>
              <p>Valor de venda: {selectedRecipe.sellValue}</p>
            </>
          ) : (
            <p>Combinação sem resultado cadastrado.</p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
