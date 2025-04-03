import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, LineChart } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Track Financial Markets in Real-Time
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Monitor currencies, stocks, and cryptocurrency prices with beautiful visualizations and real-time updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/auth')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 mb-6">
                  <LineChart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor currencies, stocks, and cryptocurrencies with up-to-date information and visualizations.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 mb-6">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Alerts</h3>
                <p className="text-muted-foreground">
                  Get visual indicators for price changes with green for positive and red for negative variations.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 mb-6">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Access</h3>
                <p className="text-muted-foreground">
                  Your data is protected with secure authentication and automatic session timeouts for inactive users.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to start tracking?</h2>
            <p className="text-lg mb-8 text-primary-foreground/80">
              Create your account now and get access to our comprehensive financial tracking dashboard.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => navigate('/auth')}
            >
              Sign Up for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Price Tracker</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;