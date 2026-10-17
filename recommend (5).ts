/**
 * Rule-based outfit recommendation engine.
 * Designed so a real AI provider can replace `generateSuggestions` later.
 */

import type { ClothingItem } from '../db/schema'

export type Weather = 'hot' | 'mild' | 'cold' | 'rainy'
export type Occasion =
  | 'casual'
  | 'college'
  | 'office'
  | 'party'
  | 'formal'
  | 'sport'
  | 'date'

interface RecommendInput {
  items: ClothingItem[]
  occasion: Occasion
  preferredColours?: string[]
  weather?: Weather
}

export interface OutfitSuggestion {
  id: string
  name: string
  occasion: Occasion
  items: ClothingItem[]
  score: number
  rationale: string
}

const SEASON_WEATHER: Record<Weather, string[]> = {
  hot: ['summer', 'all'],
  mild: ['spring', 'autumn', 'all'],
  cold: ['winter', 'all'],
  rainy: ['all', 'autumn', 'winter'],
}

const OCCASION_PRIORITY: Record<Occasion, string[]> = {
  casual: ['casual', 'college'],
  college: ['college', 'casual'],
  office: ['office', 'formal', 'casual'],
  party: ['party', 'date', 'casual'],
  formal: ['formal', 'office'],
  sport: ['sport', 'casual'],
  date: ['date', 'party', 'casual'],
}

function scoreItem(
  item: ClothingItem,
  occasion: Occasion,
  preferredColours: string[] | undefined,
  weather: Weather | undefined
): number {
  let score = 0

  const occPriority = OCCASION_PRIORITY[occasion] ?? ['casual']
  const occIdx = occPriority.indexOf(item.occasion)
  if (occIdx === 0) score += 40
  else if (occIdx > 0) score += 20
  else if (item.occasion === 'casual') score += 10

  if (preferredColours?.length) {
    if (preferredColours.includes(item.colour)) score += 25
    else if (item.colour === 'black' || item.colour === 'white' || item.colour === 'navy')
      score += 10
  } else {
    score += 5
  }

  if (weather) {
    const allowed = SEASON_WEATHER[weather]
    if (allowed.includes(item.season)) score += 20
    else score -= 15
  } else {
    score += 5
  }

  return Math.max(0, score)
}

function pickBest(
  pool: ClothingItem[],
  count: number
): ClothingItem[] {
  return [...pool].sort((a, b) => b._score - a._score).slice(0, count) as ClothingItem[]
}

interface ScoredItem extends ClothingItem {
  _score: number
}

export function generateSuggestions(input: RecommendInput): OutfitSuggestion[] {
  const { items, occasion, preferredColours, weather } = input
  if (!items.length) return []

  const scored: ScoredItem[] = items.map((item) => ({
    ...item,
    _score: scoreItem(item, occasion, preferredColours, weather),
  }))

  const byCat = (cat: string) => scored.filter((i) => i.category === cat && i._score > 0)

  const tops = byCat('tops')
  const bottoms = byCat('bottoms')
  const dresses = byCat('dresses')
  const outerwear = byCat('outerwear')
  const footwear = byCat('footwear')
  const accessories = byCat('accessories')

  const suggestions: OutfitSuggestion[] = []

  // Dress-based outfits
  for (const dress of dresses.slice(0, 2)) {
    const outfitItems: ClothingItem[] = [dress]
    if (footwear.length) outfitItems.push(footwear[0])
    if (weather === 'cold' || weather === 'rainy') {
      if (outerwear.length) outfitItems.push(outerwear[0])
    }
    if (accessories.length) outfitItems.push(accessories[0])

    suggestions.push({
      id: `sug-dress-${dress.id}`,
      name: `${dress.name} Look`,
      occasion,
      items: outfitItems,
      score: outfitItems.reduce((s, i) => s + ((i as ScoredItem)._score || 0), 0),
      rationale: `Centered on your ${dress.colour} ${dress.name}, suited for ${occasion}.`,
    })
  }

  // Top + bottom combinations
  const topPool = tops.slice(0, 4)
  const bottomPool = bottoms.slice(0, 4)

  for (let i = 0; i < Math.min(3, topPool.length); i++) {
    for (let j = 0; j < Math.min(2, bottomPool.length); j++) {
      if (suggestions.length >= 6) break
      const top = topPool[i]
      const bottom = bottomPool[j]
      const outfitItems: ClothingItem[] = [top, bottom]

      if (footwear.length) {
        const shoe = footwear[i % footwear.length]
        outfitItems.push(shoe)
      }
      if ((weather === 'cold' || weather === 'rainy') && outerwear.length) {
        outfitItems.push(outerwear[0])
      }
      if (accessories.length && i === 0) {
        outfitItems.push(accessories[0])
      }

      // Colour harmony bonus
      let colourBonus = 0
      if (top.colour === bottom.colour) colourBonus = 5
      if (
        ['black', 'white', 'grey', 'navy'].includes(top.colour) ||
        ['black', 'white', 'grey', 'navy'].includes(bottom.colour)
      ) {
        colourBonus += 5
      }

      const score =
        outfitItems.reduce((s, it) => s + ((it as ScoredItem)._score || 0), 0) + colourBonus

      suggestions.push({
        id: `sug-${top.id}-${bottom.id}`,
        name: `${top.name} + ${bottom.name}`,
        occasion,
        items: outfitItems,
        score,
        rationale: `Pairs a ${top.colour} top with ${bottom.colour} bottoms for a ${occasion} look.`,
      })
    }
  }

  return suggestions.sort((a, b) => b.score - a.score).slice(0, 5)
}
