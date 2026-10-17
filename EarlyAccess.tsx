import { useState, type FormEvent } from 'react'
import { api } from '../../services/api'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { useToast } from '../ui/Toast'

export function EarlyAccess() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('professional')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!consent) {
      toast('Please agree to the privacy policy to continue.', 'error')
      return
    }
    setLoading(true)
    try {
      await api.earlyAccess({
        name,
        email,
        interestCategory: interest,
        consent: true,
      })
      setDone(true)
      toast('You are on the early access list. Thank you!', 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Registration failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="early-access"
      className="py-20 sm:py-28 border-t border-[var(--color-border-subtle)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-display)] font-bold mb-4">
            Get early access
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Join the list to hear about product updates, digital features, and the roadmap for the
            smart wardrobe vision.
          </p>
        </div>

        {done ? (
          <div className="max-w-md mx-auto rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-glow)] p-8 text-center">
            <p className="font-semibold mb-2">You&apos;re on the list</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              We&apos;ll be in touch at the email you provided. No spam — only meaningful updates.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 sm:p-8"
          >
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              placeholder="Your name"
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Select
              label="I'm most interested as a…"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              options={[
                { value: 'student', label: 'College student' },
                { value: 'professional', label: 'Working professional' },
                { value: 'fashion', label: 'Fashion-conscious individual' },
                { value: 'smart-home', label: 'Smart-home enthusiast' },
                { value: 'other', label: 'Other' },
              ]}
            />
            <label className="flex items-start gap-3 text-sm text-[var(--color-text-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 rounded border-[var(--color-border)] accent-[var(--color-accent)]"
                required
              />
              <span>
                I agree to the{' '}
                <a href="/privacy" className="text-[var(--color-accent)] underline-offset-2 hover:underline">
                  Privacy Policy
                </a>{' '}
                and consent to being contacted about OutfitIQ early access.
              </span>
            </label>
            <Button type="submit" className="w-full" loading={loading}>
              Join early access
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
