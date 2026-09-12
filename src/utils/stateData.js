// Eagerly loads every state JSON file at build time and indexes it by its
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

// Returns the cultural data for a state slug, or undefined if that
// state's JSON file doesn't exist yet ("content coming soon" case).
export function getStateData(slug) {
  return stateDataBySlug[slug]
}
