import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-600">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-4xl font-semibold text-maroon">404</h1>
      <p className="text-lg font-medium text-ink">Page not found</p>
      <p className="text-sm text-ink-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist. It may have been moved, or the
        address might be mistyped.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-medium text-ivory-50 transition-colors hover:bg-maroon-600"
      >
        Back to map
      </Link>
    </div>
  )
}

export default NotFound
