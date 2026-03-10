import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import Archive from './pages/Archive'
import Quotes from './pages/Quotes'

export default function App() {
  const alreadyLoaded = sessionStorage.getItem('mv_loaded') === '1'
  const [loaded, setLoaded] = useState(alreadyLoaded)

  const handleDone = () => {
    sessionStorage.setItem('mv_loaded', '1')
    setLoaded(true)
  }

  return (
    <BrowserRouter>
      <Cursor />
      {!loaded && <Loader onDone={handleDone} />}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: loaded ? 'opacity 0.5s ease' : 'none',
        visibility: loaded ? 'visible' : 'hidden'
      }}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/quotes"  element={<Quotes />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}