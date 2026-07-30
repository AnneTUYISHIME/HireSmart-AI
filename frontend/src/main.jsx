import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const savedAccent = localStorage.getItem('themeAccent');
const savedAccentDark = localStorage.getItem('themeAccentDark');
if (savedAccent) document.documentElement.style.setProperty('--accent', savedAccent);
if (savedAccentDark) document.documentElement.style.setProperty('--accent-dark', savedAccentDark);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)