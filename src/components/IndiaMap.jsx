import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps'
import indiaStates from '../data/india-states.json'

// Converts a state name like "Tamil Nadu" into "tamil-nadu" to match
// the /state/:stateName route param and the data/states/*.json file naming.
function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

// India's approximate geographic center, used to center the map projection.
const MAP_CENTER = [82.8, 22.6]
const MAP_SCALE = 1100

function IndiaMap() {
  const [hoveredState, setHoveredState] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="mx-auto w-full max-w-3xl">
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
                  fill={isHovered ? '#EA580C' : '#FDBA74'}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      <p className="mt-2 text-center text-sm text-gray-500" aria-live="polite">
        {hoveredState ? hoveredState : 'Hover a state to see its name, click to explore'}
      </p>
    </div>
  )
}

export default IndiaMap
