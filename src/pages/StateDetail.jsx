import { useParams } from 'react-router-dom'

function StateDetail() {
  const { stateName } = useParams()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold text-gray-800">StateDetail</h1>
      <p className="text-gray-500">stateName: {stateName}</p>
    </div>
  )
}

export default StateDetail
