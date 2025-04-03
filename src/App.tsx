import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QuotesProvider } from '@/context/QuotesContext'
import NotFound from '@/pages/notfound';
import Dashboard from '@/pages/dashboard';
import Auth from '@/pages/auth';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '@/pages/home';

function App() {
  return (
    <QuotesProvider>
       <ThemeProvider defaultTheme="light" storageKey="price-voyager-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </QuotesProvider>
  )
}

export default App
