import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// Eagerly load every state JSON file at build time and index it by its
// filename slug (e.g. "tamil-nadu.json" -> "tamil-nadu"), matching the
// /state/:stateName route param and the project's file naming convention.
const stateModules = import.meta.glob('../data/states/*.json', { eager: true })

const stateDataBySlug = {}
for (const path in stateModules) {
  const match = path.match(/([^/]+)\.json$/)
  if (match) {
    stateDataBySlug[match[1]] = stateModules[path].default
  }
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'dress', label: 'Dress' },
  { id: 'festivals', label: 'Festivals' },
  { id: 'danceMusic', label: 'Dance & Music' },
  { id: 'cuisine', label: 'Cuisine' },
  { id: 'artsCrafts', label: 'Arts & Crafts' },
  { id: 'monuments', label: 'Monuments' },
]

function ContentComingSoon({ stateName }) {
  const readableName = stateName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800">{readableName}</h1>
      <p className="text-lg text-gray-500">Content coming soon</p>
      <p className="max-w-md text-sm text-gray-400">
        We haven't added cultural data for this state yet. Check back soon!
      </p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
      >
        Back to map
      </Link>
    </div>
  )
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-1 font-semibold text-gray-800">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  )
}

function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800"
        >
          {item}
        </span>
      ))}
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
        className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 sm:h-64"
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
      className="h-48 w-full rounded-lg object-cover sm:h-64"
    />
  )
}

function StateDetail() {
  const { stateName } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const data = stateDataBySlug[stateName]

  if (!data) {
    return <ContentComingSoon stateName={stateName} />
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{data.state}</h1>
        <p className="mt-1 text-gray-500">
          Capital: {data.capital} &middot; Languages: {data.languages.join(', ')}
        </p>
      </header>

      {/* Tab bar: horizontally scrollable on small screens */}
      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-gray-200 pb-px">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-4">
            <InfoCard title="Capital">{data.capital}</InfoCard>
            <InfoCard title="Languages">
              <TagList items={data.languages} />
            </InfoCard>
            <InfoCard title="Folklore">{data.folklore}</InfoCard>
          </div>
        )}

        {activeTab === 'dress' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DressImage
              src={data.traditionalDress.image}
              alt={`Traditional dress of ${data.state}`}
            />
            <div className="flex flex-col gap-4">
              <InfoCard title="Men">{data.traditionalDress.men}</InfoCard>
              <InfoCard title="Women">{data.traditionalDress.women}</InfoCard>
            </div>
          </div>
        )}

        {activeTab === 'festivals' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.festivals.map((festival) => (
              <InfoCard key={festival.name} title={festival.name}>
                {festival.description}
              </InfoCard>
            ))}
          </div>
        )}

        {activeTab === 'danceMusic' && (
          <div className="flex flex-col gap-4">
            <InfoCard title="Dance Forms">
              <TagList items={data.danceForms} />
            </InfoCard>
            <InfoCard title="Music">
              <TagList items={data.music} />
            </InfoCard>
          </div>
        )}

        {activeTab === 'cuisine' && (
          <InfoCard title="Cuisine">
            <TagList items={data.cuisine} />
          </InfoCard>
        )}

        {activeTab === 'artsCrafts' && (
          <InfoCard title="Arts & Crafts">
            <TagList items={data.artsCrafts} />
          </InfoCard>
        )}

        {activeTab === 'monuments' && (
          <InfoCard title="Monuments">
            <ul className="list-inside list-disc space-y-1">
              {data.monuments.map((monument) => (
                <li key={monument}>{monument}</li>
              ))}
            </ul>
          </InfoCard>
        )}
      </div>
    </div>
  )
}

export default StateDetail
