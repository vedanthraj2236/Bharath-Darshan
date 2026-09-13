import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/search', label: 'Search' },
  { to: '/compare', label: 'Compare' },
  { to: '/about', label: 'About' },
]

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-maroon text-ivory-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="font-heading text-2xl font-semibold tracking-wide text-ivory-50"
        >
          Bharat Darshan
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden flex-wrap gap-1 sm:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 font-heading text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-saffron text-maroon-900'
                    : 'text-ivory-100 hover:bg-maroon-600 hover:text-ivory-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ivory-50 hover:bg-maroon-600 sm:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-maroon-600 px-4 pb-4 pt-2 sm:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-md px-3 py-2.5 font-heading text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-saffron text-maroon-900'
                    : 'text-ivory-100 hover:bg-maroon-600 hover:text-ivory-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="h-1 bg-gradient-to-r from-gold via-saffron to-gold" />
    </header>
  )
}

export default Nav
