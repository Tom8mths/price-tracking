import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QuotesProvider } from '@/context/QuotesContext'
import NotFound from '@/pages/notfound';
import Dashboard from '@/pages/dashboard';
import Auth from '@/pages/auth';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '@/pages/home';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <QuotesProvider>
       <ThemeProvider defaultTheme="light" storageKey="price-tracker-theme">
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
    </AuthProvider>
  )
}

export default App
