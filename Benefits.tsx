import { Timer, FolderOpen, Palette, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Timer,
    title: 'Less time deciding',
    desc: 'Start from curated suggestions instead of a blank slate every morning.',
  },
  {
    icon: FolderOpen,
    title: 'Know what you own',
    desc: 'A digital catalogue keeps your wardrobe visible and organised.',
  },
  {
    icon: Palette,
    title: 'Style that fits you',
    desc: 'Preferences and occasion filters keep recommendations relevant.',
  },
  {
    icon: Sparkles,
    title: 'Path to smarter care',
    desc: 'The product vision includes automated care so clothes stay ready to wear.',
  },
]

export function Benefits() {
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-4">
            Built around real benefits
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Convenience, clarity, and less friction — without overclaiming results.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                <b.icon size={18} className="text-[var(--color-accent)]" />
              </div>
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
