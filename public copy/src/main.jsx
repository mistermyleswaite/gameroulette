import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Header from './Header.jsx'

createRoot(document.getElementById('header')).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)