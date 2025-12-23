import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActiveRoleProvider } from './context/ActiveRoleContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ActiveRoleProvider>
        <App />
      </ActiveRoleProvider>
  </StrictMode>,
)
