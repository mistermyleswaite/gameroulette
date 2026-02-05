import React from 'react'
import'react-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Header from './Header.jsx'

document.addEventListener('DOMContentLoaded', () => {
createRoot(document.getElementById('header')).render(
    <Header />
)
})