import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ALL_STATES } from '../utils/statesIndex'

const MAX_RESULTS = 8

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const trimmed = query.trim().toLowerCase()
  const matches = trimmed
    ? ALL_STATES.filter((s) => s.name.toLowerCase().includes(trimmed)).slice(0, MAX_RESULTS)
    : []

  // Close the dropdown when clicking anywhere outside the search bar.
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function goToState(slug) {
    setQuery('')
    setIsOpen(false)
    navigate(`/state/${slug}`)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && matches.length > 0) {
      goToState(matches[0].slug)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search for a state..."
        aria-label="Search for a state"
        className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
      />

      {isOpen && trimmed && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {matches.length > 0 ? (
            matches.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/state/${s.slug}`}
                  onClick={() => {
                    setQuery('')
                    setIsOpen(false)
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                >
                  {s.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-400">No states found</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
