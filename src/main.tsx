import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QuotesProvider } from './hooks/useQuotes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuotesProvider>
      <App />
    </QuotesProvider>
  </StrictMode>,
)
