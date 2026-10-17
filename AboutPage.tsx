import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function AboutPage() {
  useEffect(() => {
    document.title = 'About — OutfitIQ'
  }, [])

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-[family-name:var(--font-display)] font-bold mb-6">
          About OutfitIQ
        </h1>

        <div className="prose prose-invert space-y-8 text-[var(--color-text-muted)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
              The vision
            </h2>
            <p>
              OutfitIQ exists to reduce the friction of everyday clothing: deciding what to wear,
              knowing what you own, and caring for garments without turning mornings into a project.
              The brand sits at the intersection of fashion technology and practical convenience —
              futuristic in ambition, minimalist in presentation, and grounded in real user needs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
              The problem we aim to solve
            </h2>
            <p>
              People often own more clothes than they effectively use. Choosing an outfit can still
              feel hard. Laundry and care compete with limited time. OutfitIQ&apos;s product
              philosophy is to make the wardrobe legible digitally first — then, over time, to
              explore hardware that can wash, dry, organise, and stay in sync with that digital
              layer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
              Product philosophy
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Honesty about what is available now versus what is on the roadmap.</li>
              <li>Digital tools that work without requiring physical hardware.</li>
              <li>Recommendations that are explainable and based on the user&apos;s own clothes.</li>
              <li>Design that feels premium and calm rather than noisy or gimmicky.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
              Who it&apos;s for
            </h2>
            <p>
              College students, busy professionals, fashion-conscious people who want better
              suggestions, and anyone drawn to organised living and smart-home ideas. OutfitIQ is
              not a traditional clothing store — it is a platform concept for managing and styling
              what you already have.
            </p>
          </section>

          <section>
            <p className="text-sm text-[var(--color-text-dim)]">
              This site does not invent company history, founders, awards, or partnerships. It
              presents the product vision and a working digital experience you can try today.
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-3">
          <Link to="/#early-access">
            <Button>Get early access</Button>
          </Link>
          <Link to="/wardrobe">
            <Button variant="outline">Try the wardrobe</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
