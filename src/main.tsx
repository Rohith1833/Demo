import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HackathonProvider } from './context/HackathonContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HackathonProvider>
      <App />
    </HackathonProvider>
  </StrictMode>,
)
