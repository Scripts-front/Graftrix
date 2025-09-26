import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Routers } from './Router.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
