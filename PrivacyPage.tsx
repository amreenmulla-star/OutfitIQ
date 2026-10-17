import { useEffect } from 'react'

export function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — OutfitIQ'
  }, [])

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-[family-name:var(--font-display)] font-bold mb-6">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-[var(--color-text-muted)] text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>
            OutfitIQ (&quot;we&quot;) collects limited personal data to operate this website and the
            early-access programme.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">What we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Account data: name, email, hashed password when you register.</li>
            <li>Wardrobe data: clothing items and outfits you create while signed in.</li>
            <li>Early-access signups: name, email, optional interest category, and consent.</li>
            <li>Session cookies to keep you signed in securely.</li>
          </ul>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">How we use it</h2>
          <p>
            To provide the digital wardrobe service, authenticate users, send early-access updates
            you opted into, and improve the product. We do not sell your personal data.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Storage</h2>
          <p>
            Data is stored in a PostgreSQL database hosted by Neon. Passwords are hashed; we never
            store plain-text passwords.
          </p>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Contact</h2>
          <p>
            For privacy requests, contact the address published when the product launches
            commercially. Until then, use the early-access channel on this site.
          </p>
        </div>
      </div>
    </div>
  )
}
