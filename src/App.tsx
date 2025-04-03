import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QuotesProvider } from '@/hooks/useQuotes'
import NotFound from '@/pages/notfound';
import Dashboard from '@/pages/dashboard';
import Auth from '@/pages/auth';

function App() {
  return (
    <QuotesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QuotesProvider>
  )
}

export default App
