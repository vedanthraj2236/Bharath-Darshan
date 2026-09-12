function ListCell({ items }) {
  return (
    <ul className="list-inside list-disc space-y-0.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

// One row per schema field. `render` receives a state's full data object
// and returns the JSX/text to show for that field.
const ROWS = [
  { label: 'Capital', render: (d) => d.capital },
  { label: 'Languages', render: (d) => <ListCell items={d.languages} /> },
  { label: 'Traditional Dress — Men', render: (d) => d.traditionalDress.men },
  { label: 'Traditional Dress — Women', render: (d) => d.traditionalDress.women },
  { label: 'Festivals', render: (d) => <ListCell items={d.festivals.map((f) => f.name)} /> },
  { label: 'Dance Forms', render: (d) => <ListCell items={d.danceForms} /> },
  { label: 'Music', render: (d) => <ListCell items={d.music} /> },
  { label: 'Cuisine', render: (d) => <ListCell items={d.cuisine} /> },
  { label: 'Arts & Crafts', render: (d) => <ListCell items={d.artsCrafts} /> },
  { label: 'Folklore', render: (d) => d.folklore },
  { label: 'Monuments', render: (d) => <ListCell items={d.monuments} /> },
]

function DataCell({ state, data }) {
  if (!state) {
    return <td className="px-4 py-3 align-top text-sm text-gray-400">Select a state above.</td>
  }
  if (!data) {
    return (
      <td className="px-4 py-3 align-top text-sm text-gray-400">
        Content coming soon for {state.name}.
      </td>
    )
  }
  return null // handled per-row when data exists
}

function CompareView({ stateA, stateB, dataA, dataB }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="w-48 px-4 py-3 text-left font-semibold text-gray-700">Field</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              {stateA ? stateA.name : 'Select a state'}
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              {stateB ? stateB.name : 'Select a state'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {ROWS.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="bg-gray-50 px-4 py-3 text-left align-top text-sm font-medium text-gray-600"
              >
                {row.label}
              </th>
              {dataA ? (
                <td className="px-4 py-3 align-top text-gray-700">{row.render(dataA)}</td>
              ) : (
                <DataCell state={stateA} data={dataA} />
              )}
              {dataB ? (
                <td className="px-4 py-3 align-top text-gray-700">{row.render(dataB)}</td>
              ) : (
                <DataCell state={stateB} data={dataB} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompareView
