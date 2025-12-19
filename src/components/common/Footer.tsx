import { APP } from '@/utils/constants/contants'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-light">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {APP.NAME} All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
