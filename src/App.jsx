import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import StateDetail from './pages/StateDetail'
import Search from './pages/Search'
import Compare from './pages/Compare'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <nav className="flex flex-wrap gap-4 border-b border-gray-200 bg-white px-6 py-4">
        <Link to="/" className="text-gray-700 hover:text-orange-600">Home</Link>
        <Link to="/state/karnataka" className="text-gray-700 hover:text-orange-600">State Detail (sample)</Link>
        <Link to="/search" className="text-gray-700 hover:text-orange-600">Search</Link>
        <Link to="/compare" className="text-gray-700 hover:text-orange-600">Compare</Link>
        <Link to="/about" className="text-gray-700 hover:text-orange-600">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:stateName" element={<StateDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
