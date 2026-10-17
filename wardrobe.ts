import { z } from 'zod'

export const CATEGORIES = [
  'tops',
  'bottoms',
  'dresses',
  'outerwear',
  'footwear',
  'accessories',
] as const

export const COLOURS = [
  'black',
  'white',
  'grey',
  'navy',
  'blue',
  'green',
  'red',
  'beige',
  'brown',
  'pink',
  'purple',
  'yellow',
  'orange',
  'multicolour',
] as const

export const SEASONS = ['all', 'spring', 'summer', 'autumn', 'winter'] as const
export const OCCASIONS = [
  'casual',
  'college',
  'office',
  'party',
  'formal',
  'sport',
  'date',
] as const

export const clothingItemSchema = z.object({
  name: z.string().min(1).max(120).trim(),
  category: z.enum(CATEGORIES),
  colour: z.enum(COLOURS),
  season: z.enum(SEASONS).default('all'),
  occasion: z.enum(OCCASIONS).default('casual'),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
})

export const outfitSchema = z.object({
  name: z.string().min(1).max(120).trim(),
  occasion: z.enum(OCCASIONS).default('casual'),
  description: z.string().max(500).optional().nullable(),
  clothingItemIds: z.array(z.string().uuid()).min(1).max(10),
})

export const recommendSchema = z.object({
  occasion: z.enum(OCCASIONS).default('casual'),
  preferredColours: z.array(z.enum(COLOURS)).optional(),
  weather: z.enum(['hot', 'mild', 'cold', 'rainy']).optional(),
})

export const preferencesSchema = z.object({
  preferredColours: z.array(z.enum(COLOURS)).optional(),
  preferredStyles: z.array(z.string().max(40)).optional(),
  preferredOccasions: z.array(z.enum(OCCASIONS)).optional(),
})
