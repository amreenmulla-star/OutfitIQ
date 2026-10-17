import { useState } from 'react'
import { cn } from '../../utils/cn'

const occasions = ['College', 'Office', 'Casual', 'Party', 'Formal'] as const

const sampleOutfits: Record<
  (typeof occasions)[number],
  { name: string; pieces: string[]; colours: string[] }
> = {
  College: {
    name: 'Campus comfortable',
    pieces: ['Oversized hoodie', 'Straight jeans', 'Sneakers', 'Canvas tote'],
    colours: ['#3d4a3d', '#2a2a35', '#e8e8e0', '#8b7355'],
  },
  Office: {
    name: 'Clean professional',
    pieces: ['Structured blazer', 'White shirt', 'Tailored trousers', 'Loafers'],
    colours: ['#1a1a2e', '#f0f0ea', '#2c2c2c', '#3d2b1f'],
  },
  Casual: {
    name: 'Weekend ease',
    pieces: ['Knit polo', 'Chinos', 'White sneakers', 'Watch'],
    colours: ['#4a5568', '#c4b59a', '#f5f5f0', '#2a2a2a'],
  },
  Party: {
    name: 'Evening ready',
    pieces: ['Silk shirt', 'Dark denim', 'Chelsea boots', 'Chain necklace'],
    colours: ['#1a0a1a', '#1a1a22', '#2a1a12', '#c9a227'],
  },
  Formal: {
    name: 'Event formal',
    pieces: ['Navy suit jacket', 'Crisp shirt', 'Matching trousers', 'Oxfords'],
    colours: ['#0f1a2e', '#f8f8f4', '#0f1a2e', '#1a1208'],
  },
}

export function OutfitPreview() {
  const [active, setActive] = useState<(typeof occasions)[number]>('Office')
  const outfit = sampleOutfits[active]

  return (
    <section className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-4">
            Interactive outfit preview
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Explore example combinations by occasion. Sign in to build your own wardrobe and get
            personalised suggestions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {occasions.map((o) => (
            <button
              key={o}
              onClick={() => setActive(o)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-all border',
                active === o
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg)] border-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-dim)]'
              )}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8">
          <p className="text-sm text-[var(--color-accent)] mb-2">{outfit.name}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {outfit.pieces.map((piece, i) => (
              <div key={piece} className="space-y-3">
                <div
                  className="aspect-square rounded-xl border border-[var(--color-border-subtle)]"
                  style={{
                    background: `linear-gradient(145deg, ${outfit.colours[i]}, #0a0a0a)`,
                  }}
                />
                <p className="text-sm text-[var(--color-text-muted)] text-center">{piece}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
