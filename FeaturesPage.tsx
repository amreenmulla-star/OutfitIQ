import { useEffect } from 'react'
import { Droplets, Wind, Brain, LayoutGrid, Calendar, Sliders, Home } from 'lucide-react'

const sections = [
  {
    icon: LayoutGrid,
    title: 'Digital wardrobe management',
    body: 'Add, edit, filter, and delete clothing items. Categories cover tops, bottoms, dresses, outerwear, footwear, and accessories. Filter by colour, category, and occasion so you can find what you need quickly.',
    status: 'Available in the web app',
  },
  {
    icon: Brain,
    title: 'Personalised recommendations',
    body: 'A rule-based engine scores items against occasion, preferred colours, and weather. Suggestions are transparent and ranked. The architecture is ready for a future AI provider without rewriting the product surface.',
    status: 'Available (rule-based)',
  },
  {
    icon: Calendar,
    title: 'Occasion & outfit planning',
    body: 'Save combinations as outfits. Request looks for college, office, casual, party, formal, sport, or date. Reuse saved outfits when planning your week.',
    status: 'Available in the web app',
  },
  {
    icon: Sliders,
    title: 'Style preferences',
    body: 'Store preferred colours, styles, and occasions so recommendations stay aligned with how you like to dress.',
    status: 'Available in the web app',
  },
  {
    icon: Droplets,
    title: 'Smart clothing care',
    body: 'Proposed: integrated, gentle care cycles for garments inside a physical wardrobe unit. Not available as a shipping product feature today.',
    status: 'Proposed product vision',
  },
  {
    icon: Wind,
    title: 'Automated drying & finishing',
    body: 'Proposed: drying and ironing support so clothes leave the unit ready to wear. Part of the hardware roadmap, not a current claim.',
    status: 'Proposed product vision',
  },
  {
    icon: Home,
    title: 'Smart-home possibilities',
    body: 'A future connected wardrobe could fit into broader home automation. No specific third-party integrations are claimed at this stage.',
    status: 'Exploratory vision',
  },
]

export function FeaturesPage() {
  useEffect(() => {
    document.title = 'Features — OutfitIQ'
  }, [])

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-display)] font-bold mb-4">
            Features
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Clear separation between what the web experience offers now and what the physical
            product aims to deliver later.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-6 sm:p-8 flex flex-col sm:flex-row gap-6"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center">
                <s.icon size={22} className="text-[var(--color-accent)]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
                    {s.status}
                  </span>
                </div>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
