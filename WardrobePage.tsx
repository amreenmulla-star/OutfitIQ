import { useEffect, useState, useMemo, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Filter, Sparkles, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { useToast } from '../components/ui/Toast'
import type { ClothingItem, OutfitSuggestion, Category, Colour, Season, Occasion, Weather } from '../types'
import { cn } from '../utils/cn'

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'accessories', label: 'Accessories' },
]

const COLOURS: { value: Colour; label: string }[] = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'grey', label: 'Grey' },
  { value: 'navy', label: 'Navy' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'red', label: 'Red' },
  { value: 'beige', label: 'Beige' },
  { value: 'brown', label: 'Brown' },
  { value: 'pink', label: 'Pink' },
  { value: 'purple', label: 'Purple' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'orange', label: 'Orange' },
  { value: 'multicolour', label: 'Multicolour' },
]

const SEASONS: { value: Season; label: string }[] = [
  { value: 'all', label: 'All seasons' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
]

const OCCASIONS: { value: Occasion; label: string }[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'college', label: 'College' },
  { value: 'office', label: 'Office' },
  { value: 'party', label: 'Party' },
  { value: 'formal', label: 'Formal' },
  { value: 'sport', label: 'Sport' },
  { value: 'date', label: 'Date' },
]

const colourSwatch: Record<string, string> = {
  black: '#1a1a1a',
  white: '#f0f0ea',
  grey: '#6b6b63',
  navy: '#1a2744',
  blue: '#3b6ea5',
  green: '#3d6b4f',
  red: '#8b3a3a',
  beige: '#c4b59a',
  brown: '#5c4033',
  pink: '#c48b9f',
  purple: '#6b4c7a',
  yellow: '#c4a83a',
  orange: '#c47a3a',
  multicolour: 'linear-gradient(135deg,#b8f200,#3b6ea5,#c48b9f)',
}

export function WardrobePage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [items, setItems] = useState<ClothingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filterCat, setFilterCat] = useState<string>('')
  const [filterColour, setFilterColour] = useState<string>('')
  const [filterOcc, setFilterOcc] = useState<string>('')
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([])
  const [recOccasion, setRecOccasion] = useState<Occasion>('casual')
  const [recWeather, setRecWeather] = useState<Weather | ''>('')
  const [recLoading, setRecLoading] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>('tops')
  const [colour, setColour] = useState<Colour>('black')
  const [season, setSeason] = useState<Season>('all')
  const [occasion, setOccasion] = useState<Occasion>('casual')
  const [imageUrl, setImageUrl] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    document.title = 'Smart Wardrobe — OutfitIQ'
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    api
      .getItems()
      .then((r) => setItems(r.items))
      .catch(() => toast('Could not load wardrobe', 'error'))
      .finally(() => setLoading(false))
  }, [user, toast])

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filterCat && i.category !== filterCat) return false
      if (filterColour && i.colour !== filterColour) return false
      if (filterOcc && i.occasion !== filterOcc) return false
      return true
    })
  }, [items, filterCat, filterColour, filterOcc])

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      const { item } = await api.createItem({
        name,
        category,
        colour,
        season,
        occasion,
        imageUrl: imageUrl || null,
      })
      setItems((prev) => [item, ...prev])
      setShowForm(false)
      setName('')
      setImageUrl('')
      toast('Item added', 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Failed to add item', 'error')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.deleteItem(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
      toast('Item removed', 'success')
    } catch {
      toast('Failed to delete', 'error')
    }
  }

  const handleRecommend = async () => {
    setRecLoading(true)
    try {
      const { suggestions: s } = await api.recommend({
        occasion: recOccasion,
        weather: recWeather || undefined,
      })
      setSuggestions(s)
      if (!s.length) toast('Add more items to get suggestions', 'info')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Recommendation failed', 'error')
    } finally {
      setRecLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="py-24 text-center text-[var(--color-text-muted)]">
        Loading wardrobe…
      </div>
    )
  }

  if (!user) {
    return (
      <div className="py-24 mx-auto max-w-lg px-4 text-center">
        <h1 className="text-3xl font-[family-name:var(--font-display)] font-bold mb-4">
          Smart Wardrobe
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Sign in to catalogue your clothes, filter your wardrobe, and generate outfit suggestions.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/login">
            <Button>Sign in</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline">Create account</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-[family-name:var(--font-display)] font-bold">
              Your wardrobe
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={18} />
            Add item
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <Filter size={16} className="text-[var(--color-text-dim)]" />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="h-9 px-3 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={filterColour}
            onChange={(e) => setFilterColour(e.target.value)}
            className="h-9 px-3 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm"
          >
            <option value="">All colours</option>
            {COLOURS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={filterOcc}
            onChange={(e) => setFilterOcc(e.target.value)}
            className="h-9 px-3 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-sm"
          >
            <option value="">All occasions</option>
            {OCCASIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-12 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">
              {items.length === 0
                ? 'Your wardrobe is empty. Add your first item to get started.'
                : 'No items match these filters.'}
            </p>
            {items.length === 0 && (
              <Button onClick={() => setShowForm(true)}>
                <Plus size={18} />
                Add item
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] overflow-hidden hover:border-[var(--color-border)] transition-colors"
              >
                <div
                  className="aspect-square relative"
                  style={{
                    background:
                      typeof colourSwatch[item.colour] === 'string' &&
                      colourSwatch[item.colour].startsWith('linear')
                        ? colourSwatch[item.colour]
                        : `linear-gradient(145deg, ${colourSwatch[item.colour] || '#2a2a2a'}, #0a0a0a)`,
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-[var(--color-text-dim)] capitalize">
                    {item.category} · {item.colour} · {item.occasion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} className="text-[var(--color-accent)]" />
            <h2 className="text-xl font-semibold">Outfit suggestions</h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Rule-based recommendations from your wardrobe. Choose occasion and optional weather.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Select
              label=""
              value={recOccasion}
              onChange={(e) => setRecOccasion(e.target.value as Occasion)}
              options={OCCASIONS}
              className="w-40"
            />
            <Select
              label=""
              value={recWeather}
              onChange={(e) => setRecWeather(e.target.value as Weather | '')}
              options={[
                { value: '', label: 'Any weather' },
                { value: 'hot', label: 'Hot' },
                { value: 'mild', label: 'Mild' },
                { value: 'cold', label: 'Cold' },
                { value: 'rainy', label: 'Rainy' },
              ]}
              className="w-40"
            />
            <Button onClick={handleRecommend} loading={recLoading}>
              Generate
            </Button>
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-4">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg)] p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-[var(--color-text-dim)]">{s.rationale}</p>
                    </div>
                    <span className="text-xs text-[var(--color-accent)]">Score {s.score}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {s.items.map((it) => (
                      <span
                        key={it.id}
                        className="text-xs px-2 py-1 rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)]"
                      >
                        {it.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add item modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div
            className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-labelledby="add-item-title"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="add-item-title" className="text-lg font-semibold">
                Add clothing item
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Navy blazer"
              />
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                options={CATEGORIES}
              />
              <Select
                label="Colour"
                value={colour}
                onChange={(e) => setColour(e.target.value as Colour)}
                options={COLOURS}
              />
              <Select
                label="Season"
                value={season}
                onChange={(e) => setSeason(e.target.value as Season)}
                options={SEASONS}
              />
              <Select
                label="Occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value as Occasion)}
                options={OCCASIONS}
              />
              <Input
                label="Image URL (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…"
                type="url"
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1" loading={formLoading}>
                  Add item
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
