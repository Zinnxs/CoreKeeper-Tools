import itemsJson from './items.json'
import cookingJson from './cooking.json'
import bestiaryJson from './bestiary.json'
import serverJson from './server.json'
import type { BestiaryEntry, CookingRecipe, ItemData, ServerMarker, TeamNotice } from '@/types/core'

export const items = itemsJson as ItemData[]
export const cookingRecipes = cookingJson as CookingRecipe[]
export const bestiaryEntries = bestiaryJson as BestiaryEntry[]
export const serverData = serverJson as {
  gameId: string
  notices: TeamNotice[]
  markers: ServerMarker[]
}

export const cookingIngredients = Array.from(new Set(cookingRecipes.flatMap((recipe) => recipe.ingredients))).sort()
