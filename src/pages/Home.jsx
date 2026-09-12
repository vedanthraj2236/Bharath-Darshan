import IndiaMap from '../components/IndiaMap'

function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800">Home</h1>
      <IndiaMap />
    </div>
  )
}

export default Home
