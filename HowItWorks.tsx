const steps = [
  {
    step: '01',
    title: 'Add or organise your wardrobe',
    desc: 'Catalogue pieces digitally — name, category, colour, season, and occasion.',
  },
  {
    step: '02',
    title: 'Set style preferences',
    desc: 'Tell OutfitIQ your preferred colours, occasions, and the way you like to dress.',
  },
  {
    step: '03',
    title: 'Receive outfit suggestions',
    desc: 'Get combinations matched to your clothes, the occasion, and conditions you choose.',
  },
  {
    step: '04',
    title: 'Manage care & wardrobe',
    desc: 'Keep track of what you own. Proposed hardware would extend this to physical care.',
  },
]

export function HowItWorksPreview() {
  return (
    <section className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-4">
            How it works
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            A simple flow from wardrobe to recommendation — digital today, with a clear path for
            hardware later.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[var(--color-border)] -translate-x-3 z-0" />
              )}
              <div className="relative z-10">
                <span className="text-sm font-mono text-[var(--color-accent)] mb-3 block">
                  {s.step}
                </span>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
