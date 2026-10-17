import { Droplets, Wind, Brain, LayoutGrid, Calendar, Sliders } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const features = [
  {
    icon: Droplets,
    title: 'Smart Clothing Care',
    desc: 'Proposed integrated system for gentle washing and care of garments inside the wardrobe.',
    proposed: true,
  },
  {
    icon: Wind,
    title: 'Automated Drying & Ironing',
    desc: 'Intended capability to dry and finish clothes so they are ready to wear.',
    proposed: true,
  },
  {
    icon: Brain,
    title: 'Outfit Recommendations',
    desc: 'Suggestions based on your clothes, occasion, weather, and style preferences.',
    proposed: false,
  },
  {
    icon: LayoutGrid,
    title: 'Digital Wardrobe',
    desc: 'Catalogue, filter, and manage every piece you own in one place.',
    proposed: false,
  },
  {
    icon: Calendar,
    title: 'Occasion-Based Styling',
    desc: 'Looks tailored for college, office, parties, formal events, and more.',
    proposed: false,
  },
  {
    icon: Sliders,
    title: 'Personal Style Preferences',
    desc: 'Tune colours, styles, and occasions so recommendations feel like you.',
    proposed: false,
  },
]

export function Features() {
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-4">
              Designed for how you actually get dressed
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg">
              Digital experiences available to explore now. Hardware care features are part of the
              product vision.
            </p>
          </div>
          <Link to="/features">
            <Button variant="outline">All features</Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-6 hover:border-[var(--color-border)] hover:bg-[var(--color-bg-card-hover)] transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)]/40 transition-colors">
                  <f.icon size={18} className="text-[var(--color-accent)]" />
                </div>
                {f.proposed && (
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-dim)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
                    Proposed
                  </span>
                )}
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
