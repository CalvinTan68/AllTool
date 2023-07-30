import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PWGEN from './pages/pwgen'
import Home from './pages/home'
import URLCheck from './pages/urlcheck'
import URLShort from './pages/urlshort'

function App() {
  return (
    <>
    <div className="content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pwgen" element={<PWGEN />} />
      <Route path="/urlcheck" element={<URLCheck />} />
      <Route path="/urlshortener" element={<URLShort />} />
    </Routes>
    </div>
    </>
  )
}

export default App
