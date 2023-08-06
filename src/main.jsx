import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Homepage/home'
import PWGEN from './pages/PasswordGenerator/pwgen'
import URLShort from './pages/URLShortener/urlshort'
import NetCheck from './pages/NetworkChecker/netcheck'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password-generator" element={<PWGEN />} />
        <Route path="/url-shortener" element={<URLShort />} />
        <Route path="/network-checker" element={<NetCheck />} />
      </Routes>
    </BrowserRouter>
)
