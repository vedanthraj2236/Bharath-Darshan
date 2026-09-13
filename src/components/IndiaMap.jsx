import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps'
import indiaStates from '../data/india-states.json'
import { slugify } from '../utils/statesIndex'

// India's approximate geographic center, used to center the map projection.
const MAP_CENTER = [82.8, 22.6]
const MAP_SCALE = 1100

function IndiaMap() {
  const [hoveredState, setHoveredState] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-3xl border-2 border-gold bg-ivory-50 p-3 shadow-sm sm:p-5">
        <div className="rounded-2xl border border-gold-300/50 p-2 sm:p-4">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: MAP_CENTER, scale: MAP_SCALE }}
            className="h-auto w-full"
          >
            <Geographies geography={indiaStates}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm
                  const isHovered = hoveredState === stateName

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredState(stateName)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => navigate(`/state/${slugify(stateName)}`)}
                      fill={isHovered ? '#7A1620' : '#F0972B'}
                      stroke={isHovered ? '#D9B24C' : '#FFFCF7'}
                      strokeWidth={isHovered ? 1.2 : 0.6}
                      style={{
                        outline: 'none',
                        cursor: 'pointer',
                        transition: 'fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease',
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-ink-500" aria-live="polite">
        {hoveredState ? (
          <span className="font-heading text-base font-medium text-maroon">{hoveredState}</span>
        ) : (
          'Hover a state to see its name, click to explore'
        )}
      </p>
    </div>
  )
}

export default IndiaMap
