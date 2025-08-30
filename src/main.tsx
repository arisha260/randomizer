import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './assets/scss/main.scss'
import Home from './pages/Home.tsx'

createRoot(document.getElementById('arishas-randomizer')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='page'>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
)
