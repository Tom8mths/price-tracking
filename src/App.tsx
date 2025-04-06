import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QuotesProvider } from '@/context/QuotesContext'
import NotFound from '@/pages/notfound';
import Dashboard from '@/pages/dashboard';
import Auth from '@/pages/auth';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '@/pages/home';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <QuotesProvider>
       <ThemeProvider defaultTheme="light" storageKey="price-tracker-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
            }
            />
          <Route path="/auth" element={<Auth />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </QuotesProvider>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
