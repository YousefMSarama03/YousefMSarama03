import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Initialize theme before React renders to prevent flash
const storedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = storedTheme || (prefersDark ? 'dark' : 'light')

if (theme === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
