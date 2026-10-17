export type Category =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'footwear'
  | 'accessories'

export type Colour =
  | 'black'
  | 'white'
  | 'grey'
  | 'navy'
  | 'blue'
  | 'green'
  | 'red'
  | 'beige'
  | 'brown'
  | 'pink'
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'multicolour'

export type Season = 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
export type Occasion =
  | 'casual'
  | 'college'
  | 'office'
  | 'party'
  | 'formal'
  | 'sport'
  | 'date'
export type Weather = 'hot' | 'mild' | 'cold' | 'rainy'

export interface User {
  id: string
  name: string
  email: string
}

export interface ClothingItem {
  id: string
  userId: string
  name: string
  category: Category
  colour: Colour
  season: Season
  occasion: Occasion
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface Outfit {
  id: string
  userId: string
  name: string
  occasion: Occasion
  description: string | null
  createdAt: string
  items?: ClothingItem[]
}

export interface OutfitSuggestion {
  id: string
  name: string
  occasion: Occasion
  items: ClothingItem[]
  score: number
  rationale: string
}

export interface UserPreferences {
  preferredColours?: Colour[]
  preferredStyles?: string[]
  preferredOccasions?: Occasion[]
}
