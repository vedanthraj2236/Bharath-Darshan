import indiaStates from '../data/india-states.json'

// Converts a state name like "Tamil Nadu" into "tamil-nadu" to match
// the /state/:stateName route param and the data/states/*.json file naming.
export function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

// The full, alphabetically sorted list of India's states/UTs with their
// slug, derived from the same TopoJSON used by the map — so the search
// bar, compare page, and map always agree on the same set of names.
const uniqueNames = [
  ...new Set(indiaStates.objects.states.geometries.map((g) => g.properties.st_nm)),
]

export const ALL_STATES = uniqueNames
  .map((name) => ({ name, slug: slugify(name) }))
  .sort((a, b) => a.name.localeCompare(b.name))
