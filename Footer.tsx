import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-[var(--color-accent)] flex items-center justify-center">
                <span className="text-[var(--color-bg)] font-bold text-xs">OQ</span>
              </div>
              <span className="font-[family-name:var(--font-display)] font-semibold">OutfitIQ</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Your Wardrobe. Reimagined.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <Link to="/features" className="hover:text-[var(--color-text)] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[var(--color-text)] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/wardrobe" className="hover:text-[var(--color-text)] transition-colors">
                  Smart Wardrobe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <Link to="/about" className="hover:text-[var(--color-text)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="/#early-access" className="hover:text-[var(--color-text)] transition-colors">
                  Early Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <Link to="/privacy" className="hover:text-[var(--color-text)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[var(--color-text)] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row justify-between gap-4 text-xs text-[var(--color-text-dim)]">
          <p>© {new Date().getFullYear()} OutfitIQ. All rights reserved.</p>
          <p>
            Product vision for a smart wardrobe platform. Hardware capabilities are proposed and not
            yet commercially available.
          </p>
        </div>
      </div>
    </footer>
  )
}
