import { Clock, HelpCircle, Shirt, Frown } from 'lucide-react'

const problems = [
  {
    icon: HelpCircle,
    title: 'Decision fatigue',
    desc: 'Standing in front of a full wardrobe and still not knowing what to wear.',
  },
  {
    icon: Clock,
    title: 'Time wasted',
    desc: 'Minutes every morning spent assembling outfits from scattered clothes.',
  },
  {
    icon: Shirt,
    title: 'Laundry & care',
    desc: 'Managing washing, drying, and ironing competes with everything else.',
  },
  {
    icon: Frown,
    title: 'Forgotten pieces',
    desc: 'Clothes you own but never see — buried or overlooked in the wardrobe.',
  },
]

export function ProblemSolution() {
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-4">
            The daily wardrobe problem
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
            Getting dressed should be simple. For most people it isn&apos;t — OutfitIQ is designed
            to change that.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center mb-4">
                <p.icon size={18} className="text-[var(--color-text-muted)]" />
              </div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent-glow)] p-8 sm:p-10">
          <h3 className="text-xl font-[family-name:var(--font-display)] font-semibold mb-3">
            How OutfitIQ proposes to help
          </h3>
          <p className="text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
            By combining a digital wardrobe that tracks what you own with rule-based (and future AI)
            outfit recommendations, and a product vision for automated clothing care — washing,
            drying, and organising — OutfitIQ aims to remove friction from everyday dressing and
            garment management. The website experience lets you explore the digital side today;
            physical hardware capabilities remain part of the product roadmap.
          </p>
        </div>
      </div>
    </section>
  )
}
