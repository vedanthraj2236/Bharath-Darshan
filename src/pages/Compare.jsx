import { useState } from 'react'
import { ALL_STATES } from '../utils/statesIndex'
import { getStateData } from '../utils/stateData'
import CompareView from '../components/CompareView'

function StateSelect({ label, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="w-full rounded-full border border-gold-100 bg-ivory-50 px-4 py-2.5 text-sm text-ink shadow-sm transition-colors focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
    >
      <option value="">{label}</option>
      {ALL_STATES.map((s) => (
        <option key={s.slug} value={s.slug}>
          {s.name}
        </option>
      ))}
    </select>
  )
}

function Compare() {
  const [slugA, setSlugA] = useState('')
  const [slugB, setSlugB] = useState('')

  const stateA = ALL_STATES.find((s) => s.slug === slugA) || null
  const stateB = ALL_STATES.find((s) => s.slug === slugB) || null
  const dataA = slugA ? getStateData(slugA) : null
  const dataB = slugB ? getStateData(slugB) : null

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="mb-8 text-3xl font-semibold text-maroon sm:text-4xl">Compare</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StateSelect label="Select first state..." value={slugA} onChange={setSlugA} />
        <StateSelect label="Select second state..." value={slugB} onChange={setSlugB} />
      </div>

      {stateA || stateB ? (
        <CompareView stateA={stateA} stateB={stateB} dataA={dataA} dataB={dataB} />
      ) : (
        <p className="text-ink-500">Pick two states above to compare their traditions side by side.</p>
      )}
    </div>
  )
}

export default Compare
