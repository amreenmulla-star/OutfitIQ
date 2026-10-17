import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { generateSuggestions } from './recommend'
import type { ClothingItem } from '../db/schema'

function item(partial: Partial<ClothingItem> & { id: string; name: string; category: string }): ClothingItem {
  return {
    userId: 'u1',
    colour: 'black',
    season: 'all',
    occasion: 'casual',
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...partial,
  } as ClothingItem
}

describe('generateSuggestions', () => {
  it('returns empty array for empty wardrobe', () => {
    const result = generateSuggestions({ items: [], occasion: 'casual' })
    assert.equal(result.length, 0)
  })

  it('suggests top+bottom combinations', () => {
    const items = [
      item({ id: '1', name: 'Tee', category: 'tops', colour: 'white', occasion: 'casual' }),
      item({ id: '2', name: 'Jeans', category: 'bottoms', colour: 'blue', occasion: 'casual' }),
      item({ id: '3', name: 'Sneakers', category: 'footwear', colour: 'white', occasion: 'casual' }),
    ]
    const result = generateSuggestions({ items, occasion: 'casual' })
    assert.ok(result.length > 0)
    assert.ok(result[0].items.some((i) => i.category === 'tops'))
  })

  it('prefers matching occasion', () => {
    const items = [
      item({ id: '1', name: 'Blazer', category: 'tops', colour: 'navy', occasion: 'office' }),
      item({ id: '2', name: 'Hoodie', category: 'tops', colour: 'grey', occasion: 'casual' }),
      item({ id: '3', name: 'Trousers', category: 'bottoms', colour: 'black', occasion: 'office' }),
      item({ id: '4', name: 'Jeans', category: 'bottoms', colour: 'blue', occasion: 'casual' }),
    ]
    const result = generateSuggestions({ items, occasion: 'office' })
    assert.ok(result.length > 0)
    const topNames = result.flatMap((s) => s.items.map((i) => i.name))
    assert.ok(topNames.includes('Blazer') || topNames.includes('Trousers'))
  })
})
