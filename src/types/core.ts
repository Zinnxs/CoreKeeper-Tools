export type ItemCategory = 'Weapons' | 'Armor' | 'Accessories' | 'Materials' | 'Valuables'

export type StatBlock = {
  meleeDamage?: number
  rangedDamage?: number
  dodge?: number
  armor?: number
}

export type ItemData = {
  id: string
  name: string
  category: ItemCategory
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary'
  description: string
  equipmentSlots?: Array<'head' | 'chest' | 'legs' | 'ring' | 'necklace' | 'weapon' | 'tool'>
  setName?: string
  setBonus?: StatBlock
  baseStats: StatBlock
  upgradeBonuses: string[]
  foundIn: {
    biome?: string
    mob?: string
    source: string
  }
  crafting: {
    workstation: string
    materials: Array<{ item: string; quantity: number }>
    tree: string[]
  }
}

export type CookingRecipe = {
  id: string
  ingredients: [string, string]
  result: string
  buffs: string[]
  duration: string
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic'
  sellValue: number
}

export type BestiaryEntry = {
  id: string
  name: string
  type: 'Boss' | 'Enemy'
  biome: string
  attackPatterns: string[]
  summonStrategy: string
  lootTable: Array<{ item: string; dropRate: string }>
}

export type ServerMarker = {
  id: string
  label: string
  x: number
  y: number
}

export type TeamNotice = {
  id: string
  title: string
  description: string
}
