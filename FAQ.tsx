import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

const faqs = [
  {
    q: 'What is OutfitIQ?',
    a: 'OutfitIQ is a fashion-technology brand focused on a smart wardrobe concept: digital wardrobe management and outfit recommendations today, with a product vision for automated clothing care (wash, dry, organise) in the future.',
  },
  {
    q: 'How do outfit recommendations work?',
    a: 'The current website uses a transparent, rule-based engine that scores your clothing items by occasion, colour preferences, and weather. The codebase is structured so a full AI model can be integrated later.',
  },
  {
    q: 'Which features are available now?',
    a: 'You can register, manage a digital wardrobe, save outfits, and generate rule-based suggestions. Physical hardware capabilities (washing, drying, ironing) are proposed product features and are not claimed as available today.',
  },
  {
    q: 'How does early access work?',
    a: 'Submit your name and email on the homepage. We store your interest securely and will contact you with updates. There is no purchase required to join the list.',
  },
  {
    q: 'Does the wardrobe require a connected app?',
    a: 'The digital experience on this website works in the browser. Any future physical smart wardrobe would likely pair with a companion app; that product is still in the vision stage.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-10 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'shrink-0 text-[var(--color-text-dim)] transition-transform',
                    open === i && 'rotate-180'
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
