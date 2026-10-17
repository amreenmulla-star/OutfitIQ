import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(184, 242, 0, 0.08), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-xs text-[var(--color-text-muted)] mb-6">
              <Sparkles size={12} className="text-[var(--color-accent)]" />
              Fashion Technology · Smart Wardrobe
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-display)] font-bold leading-[1.1] tracking-tight mb-6">
              Meet the Wardrobe That{' '}
              <span className="text-gradient">Thinks Ahead.</span>
            </h1>

            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-lg">
              OutfitIQ is a proposed smart wardrobe platform that combines automated clothing care
              with intelligent outfit recommendations — so you spend less time deciding and more
              time living.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/features">
                <Button size="lg">
                  Explore OutfitIQ
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#early-access">
                <Button variant="outline" size="lg">
                  Get Early Access
                </Button>
              </a>
            </div>
          </div>

          {/* Product visual */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden relative accent-glow">
              {/* Abstract wardrobe visualization */}
              <div className="absolute inset-0 flex flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-2 w-20 rounded-full bg-[var(--color-border)]" />
                  <div className="h-6 w-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  {['Office', 'College', 'Casual', 'Party'].map((label, i) => (
                    <div
                      key={label}
                      className="rounded-xl bg-[var(--color-bg)] border border-[var(--color-border-subtle)] p-4 flex flex-col justify-between"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="space-y-2">
                        <div
                          className="h-16 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${
                              ['#2a2a2a', '#1a2a1a', '#2a1a2a', '#1a1a2a'][i]
                            }, #121212)`,
                          }}
                        />
                        <div className="h-2 w-12 rounded-full bg-[var(--color-border)]" />
                      </div>
                      <p className="text-xs text-[var(--color-text-dim)] mt-2">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-accent)]/20 p-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center">
                    <Sparkles size={14} className="text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Today&apos;s suggestion</p>
                    <p className="text-[10px] text-[var(--color-text-dim)]">
                      Navy blazer · White tee · Dark denim
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
