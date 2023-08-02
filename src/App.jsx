import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PWGEN from './pages/pwgen'
import Home from './pages/home'
import Currency from './pages/currency'
import URLShort from './pages/urlshort'

function App() {
  return (
    <>
    <div className="content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pwgen" element={<PWGEN />} />
      <Route path="/urlshortener" element={<URLShort />} />
      <Route path="/currency" element={<Currency />} />
    </Routes>
    </div>
    </>
  )
}

export default App
