import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import StateDetail from './pages/StateDetail'
import Search from './pages/Search'
import Compare from './pages/Compare'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ivory-100">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/state/:stateName" element={<StateDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
