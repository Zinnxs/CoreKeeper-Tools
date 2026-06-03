import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { items } from '@/data'
import type { ItemData, StatBlock } from '@/types/core'

const slots = ['head', 'chest', 'legs', 'ring', 'necklace', 'weapon', 'tool'] as const

type Slot = (typeof slots)[number]

const defaultEquipment: Record<Slot, string> = {
  head: '',
  chest: '',
  legs: '',
  ring: '',
  necklace: '',
  weapon: '',
  tool: '',
}

function sumStats(acc: StatBlock, value: StatBlock): StatBlock {
  return {
    meleeDamage: (acc.meleeDamage ?? 0) + (value.meleeDamage ?? 0),
    rangedDamage: (acc.rangedDamage ?? 0) + (value.rangedDamage ?? 0),
    dodge: (acc.dodge ?? 0) + (value.dodge ?? 0),
    armor: (acc.armor ?? 0) + (value.armor ?? 0),
  }
}

export function BuildPlannerPage() {
  const [equipment, setEquipment] = useState(defaultEquipment)

  const equippedItems = useMemo(() => {
    return Object.values(equipment)
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is ItemData => Boolean(item))
  }, [equipment])

  const totalStats = useMemo(() => {
    const base = equippedItems.reduce<StatBlock>((acc, item) => sumStats(acc, item.baseStats), {})

    const setCounts = equippedItems.reduce<Record<string, number>>((acc, item) => {
      if (!item.setName) {
        return acc
      }

      acc[item.setName] = (acc[item.setName] ?? 0) + 1
      return acc
    }, {})

    const activeSetBonuses = Object.entries(setCounts)
      .filter(([, count]) => count >= 3)
      .map(([setName]) => equippedItems.find((item) => item.setName === setName)?.setBonus)
      .filter((bonus): bonus is StatBlock => Boolean(bonus))

    return activeSetBonuses.reduce<StatBlock>((acc, bonus) => sumStats(acc, bonus), base)
  }, [equippedItems])

  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Build Planner</p>
        <h2 className="text-2xl font-semibold md:text-3xl">Paper doll com cálculo automático</h2>
      </header>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Slots de equipamento</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {slots.map((slot) => {
              const options = items.filter((item) => item.equipmentSlots?.includes(slot))

              return (
                <label key={slot} className="space-y-2 text-sm text-slate-300">
                  <span className="block capitalize">{slot}</span>
                  <select
                    value={equipment[slot]}
                    onChange={(event) => setEquipment((current) => ({ ...current, [slot]: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-slate-100 outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    <option value="">Nenhum</option>
                    {options.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atributos totais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-300">
            <p>Dano corpo a corpo: {totalStats.meleeDamage ?? 0}</p>
            <p>Dano à distância: {totalStats.rangedDamage ?? 0}</p>
            <p>Esquiva: {totalStats.dodge ?? 0}</p>
            <p>Armadura: {totalStats.armor ?? 0}</p>
            <p className="pt-3 text-xs text-slate-400">Bônus de conjunto ativado ao equipar 3 peças do mesmo set.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
