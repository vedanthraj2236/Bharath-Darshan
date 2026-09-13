import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/search', label: 'Search' },
  { to: '/compare', label: 'Compare' },
  { to: '/about', label: 'About' },
]

function Nav() {
  return (
    <header className="bg-maroon text-ivory-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <NavLink to="/" className="font-heading text-2xl font-semibold tracking-wide text-ivory-50">
          Bharat Darshan
        </NavLink>

        <nav className="flex flex-wrap gap-1">
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
      </div>
      <div className="h-1 bg-gradient-to-r from-gold via-saffron to-gold" />
    </header>
  )
}

export default Nav
