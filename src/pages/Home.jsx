import IndiaMap from '../components/IndiaMap'
import SearchBar from '../components/SearchBar'

function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 py-14 sm:py-20">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-maroon sm:text-5xl">Bharat Darshan</h1>
        <p className="mx-auto mt-3 max-w-xl text-balance text-base text-ink-500 sm:text-lg">
          A visual journey through India&rsquo;s states — dress, festivals, dance, music, cuisine, and more.
        </p>
      </div>

      <SearchBar />
      <IndiaMap />
    </div>
  )
}

export default Home
