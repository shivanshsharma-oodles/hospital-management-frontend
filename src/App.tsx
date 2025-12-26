import { Toaster } from 'react-hot-toast'
import AppRoutes from '@/router/AppRoutes'
import React from 'react'

function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      <AppRoutes />
      <Toaster
        position='bottom-right'
        toastOptions={{
          // Default styles
          style: {
            fontFamily: 'monospace',
            fontSize: '14px',
            width: '70%',
            overflow: 'hidden',
            padding: '8px 10px',
            border: '1px solid #a8a8a8',
            animation: 'toast-custom-animation 800ms ease', // 1s for slow animation
          },
          // SUCCESS Toast
          success: {
            style: {
              background: '#e6f7ea', // Light green
              color: '#155724',       // Dark green
              border: '1px solid #858585', // Green border
            },
          },
          // ERROR Toast
          error: {
            style: {
              background: '#fae3e5', // Light red
              color: '#721c24',       // Dark red
              border: '1px solid #dc3545', // Red border
            },
          },
        }}
      />
    </div>
  )
}

export default App