import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  MapPin,
  Languages as LanguagesIcon,
  Shirt,
  PartyPopper,
  PersonStanding,
  Music,
  UtensilsCrossed,
  Palette,
  Landmark,
  BookOpen,
} from 'lucide-react'
import { getStateData } from '../utils/stateData'

const TABS = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'dress', label: 'Dress', icon: Shirt },
  { id: 'festivals', label: 'Festivals', icon: PartyPopper },
  { id: 'danceMusic', label: 'Dance & Music', icon: Music },
  { id: 'cuisine', label: 'Cuisine', icon: UtensilsCrossed },
  { id: 'artsCrafts', label: 'Arts & Crafts', icon: Palette },
  { id: 'monuments', label: 'Monuments', icon: Landmark },
]

function SkeletonBlock({ className }) {
  return <div className={`animate-pulse rounded-2xl bg-gold-100/50 ${className}`} />
}

function StateDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading state details&hellip;</span>
      <div className="mb-8">
        <SkeletonBlock className="h-9 w-48" />
        <div className="mt-3 flex gap-4">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-32" />
        </div>
      </div>
      <SkeletonBlock className="mb-8 h-12 w-full rounded-full" />
      <SkeletonBlock className="h-40 w-full" />
    </div>
  )
}


function ContentComingSoon({ stateName }) {
  const readableName = stateName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold text-maroon">{readableName}</h1>
      <p className="text-lg font-medium text-saffron-600">Content coming soon</p>
      <p className="text-sm text-ink-500">
        We haven&rsquo;t added cultural data for this state yet. Check back soon!
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

function DressImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-56 w-full items-center justify-center rounded-2xl border-2 border-dashed border-gold-100 bg-ivory-50 text-sm text-ink-500/70 sm:h-72"
      >
        Image coming soon
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-56 w-full rounded-2xl border-2 border-gold object-cover sm:h-72"
    />
  )
}

function DressCard({ label, text }) {
  return (
    <div className="rounded-2xl border border-gold-100 bg-ivory-50 p-5">
      <div className="mb-2 flex items-center gap-2 text-maroon">
        <Shirt className="h-4 w-4" />
        <h3 className="font-heading text-base font-semibold">{label}</h3>
      </div>
      <p className="text-sm leading-relaxed text-ink-500">{text}</p>
    </div>
  )
}

function FestivalCard({ name, description }) {
  return (
    <div className="rounded-2xl border border-gold-100 bg-ivory-50 p-5 transition-shadow hover:shadow-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-saffron text-ivory-50">
        <PartyPopper className="h-5 w-5" />
      </div>
      <h3 className="mb-1 font-heading text-lg font-semibold text-maroon">{name}</h3>
      <p className="text-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  )
}

function TagCard({ icon: Icon, title, items }) {
  return (
    <div className="rounded-2xl border border-gold-100 bg-ivory-50 p-5">
      <div className="mb-3 flex items-center gap-2 text-maroon">
        <Icon className="h-5 w-5" />
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-saffron-100 px-3 py-1 text-sm text-maroon-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function MonumentCard({ name }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gold-100 bg-ivory-50 p-4">
      <Landmark className="h-5 w-5 shrink-0 text-maroon" />
      <span className="text-sm text-ink">{name}</span>
    </div>
  )
}

function StateDetail() {
  const { stateName } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  // Data currently comes from a bundled JSON file, so lookup is instant —
  // but this effect keeps the loading state correct if that ever changes
  // to a real fetch, and gives the user visible feedback when switching
  // states (rather than an abrupt content swap).
  useEffect(() => {
    setIsLoading(true)
    setActiveTab('overview')

    const timer = setTimeout(() => {
      setData(getStateData(stateName))
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [stateName])

  if (isLoading) {
    return <StateDetailSkeleton />
  }

  if (!data) {
    return <ContentComingSoon stateName={stateName} />
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-maroon sm:text-4xl">{data.state}</h1>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-saffron-600" />
            {data.capital}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <LanguagesIcon className="h-4 w-4 text-saffron-600" />
            {data.languages.join(', ')}
          </span>
        </div>
      </header>

      {/* Tab bar: horizontally scrollable segmented control */}
      <div className="mb-8 flex gap-1 overflow-x-auto rounded-full border border-gold-100 bg-ivory-50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-maroon text-ivory-50'
                : 'text-ink-500 hover:bg-maroon-50 hover:text-maroon'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'overview' && (
          <div className="rounded-2xl border border-gold-100 bg-maroon-50 p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-maroon">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-heading text-lg font-semibold">Folklore</h3>
            </div>
            <p className="leading-relaxed text-ink-500">{data.folklore}</p>
          </div>
        )}

        {activeTab === 'dress' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <DressImage
                src={data.traditionalDress.image}
                alt={`Traditional dress worn by men and women in ${data.state}`}
              />
            </div>
            <div className="flex flex-col gap-4 sm:col-span-3">
              <DressCard label="Men" text={data.traditionalDress.men} />
              <DressCard label="Women" text={data.traditionalDress.women} />
            </div>
          </div>
        )}

        {activeTab === 'festivals' && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data.festivals.map((festival) => (
              <FestivalCard
                key={festival.name}
                name={festival.name}
                description={festival.description}
              />
            ))}
          </div>
        )}

        {activeTab === 'danceMusic' && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TagCard icon={PersonStanding} title="Dance Forms" items={data.danceForms} />
            <TagCard icon={Music} title="Music" items={data.music} />
          </div>
        )}

        {activeTab === 'cuisine' && (
          <TagCard icon={UtensilsCrossed} title="Cuisine" items={data.cuisine} />
        )}

        {activeTab === 'artsCrafts' && (
          <TagCard icon={Palette} title="Arts & Crafts" items={data.artsCrafts} />
        )}

        {activeTab === 'monuments' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.monuments.map((monument) => (
              <MonumentCard key={monument} name={monument} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StateDetail
