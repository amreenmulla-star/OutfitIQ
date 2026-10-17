import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const digitalSteps = [
  {
    title: 'Catalogue your clothes',
    body: 'Add items with name, category, colour, season, and occasion. Use placeholder images or your own URLs.',
  },
  {
    title: 'Define preferences',
    body: 'Set preferred colours and occasions so suggestions lean toward what you actually wear.',
  },
  {
    title: 'Request suggestions',
    body: 'Choose an occasion and optional weather. A rule-based engine ranks combinations from your wardrobe.',
  },
  {
    title: 'Save outfits',
    body: 'Keep favourite combinations for quick reuse and planning.',
  },
]

const hardwareVision = [
  'Integrated gentle washing and care cycles for garments stored in the unit.',
  'Automated drying and finishing so pieces are ready to wear.',
  'Physical organisation that stays in sync with the digital catalogue.',
  'A connected experience that bridges care tasks and daily outfit decisions.',
]

export function HowItWorksPage() {
  useEffect(() => {
    document.title = 'How It Works — OutfitIQ'
  }, [])

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-display)] font-bold mb-4">
            How OutfitIQ works
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            We separate the digital experience you can use today from the physical smart wardrobe
            capabilities that remain part of the product vision.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-semibold mb-8">
            Digital experience (available to explore)
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {digitalSteps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-6"
              >
                <span className="text-sm font-mono text-[var(--color-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/wardrobe">
              <Button>Open Smart Wardrobe</Button>
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-dim)] mb-3">
            Product vision
          </p>
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-semibold mb-4">
            Proposed physical smart wardrobe
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6 max-w-2xl leading-relaxed">
            The long-term product aims to pair the digital layer with hardware that cares for and
            organises clothes. These capabilities are intended goals — not features claimed as
            shipping today.
          </p>
          <ul className="space-y-3">
            {hardwareVision.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[var(--color-text-muted)]">
                <span className="text-[var(--color-accent)] mt-0.5">·</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
