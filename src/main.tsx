import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './assets/scss/main.scss'
import Home from './pages/Home.tsx'
import ListPage from './pages/ListPage.tsx';
import { Logo } from './components/Logo.tsx';
import NumbersPage from './pages/NumbersPage.tsx';

createRoot(document.getElementById('arishas-randomizer')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='page'>
        <div className="container">
          <Logo />
          <Routes>
            <Route index element={<Home />} />
            <Route path="list" element={<ListPage />} />
            <Route path="numbers" element={<NumbersPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
)
