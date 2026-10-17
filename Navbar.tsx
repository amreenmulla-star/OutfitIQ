import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const links = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/features', label: 'Features' },
  { to: '/wardrobe', label: 'Smart Wardrobe' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 glass border-b border-[var(--color-border-subtle)]">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <span className="text-[var(--color-bg)] font-bold text-sm font-[family-name:var(--font-display)]">
              OQ
            </span>
          </div>
          <span className="font-[family-name:var(--font-display)] font-semibold text-lg tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
            OutfitIQ
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2 text-sm rounded-lg transition-colors',
                  isActive
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!loading && user ? (
            <>
              <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-1.5">
                <User size={14} />
                {user.name.split(' ')[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/#early-access">
                <Button size="sm">Get Early Access</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-4 py-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-2.5 rounded-lg text-sm',
                  isActive
                    ? 'text-[var(--color-accent)] bg-[var(--color-bg-card)]'
                    : 'text-[var(--color-text-muted)]'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-[var(--color-border-subtle)] space-y-2">
            {!loading && user ? (
              <Button variant="secondary" className="w-full" onClick={handleLogout}>
                Sign out
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link to="/#early-access" onClick={() => setOpen(false)}>
                  <Button className="w-full">Get Early Access</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
