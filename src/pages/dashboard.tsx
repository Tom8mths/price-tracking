import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PriceCard from '@/components/PriceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import mockedData from '@/services/mockedData';
import { Currencies, Stocks, Bitcoins } from '@/types';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'currencies' | 'stocks' | 'bitcoin'>('currencies');
  console.log('mockedData', mockedData);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Input
                placeholder="Search..."
                value=''
                className="pr-10"
              />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                >
                  <X className="h-4 w-4" />
                </Button>
            </div>
            
            <Button
              variant="outline"
              size="icon"
            >
              <RefreshCw className={`h-4 w-4`} />
            </Button>
          </div>
        </div>
        
        <Tabs
          defaultValue="currencies"
          value={selectedTab}
          onValueChange={(v) => setSelectedTab(v as 'currencies' | 'stocks' | 'bitcoin')}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="currencies">Currencies</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="currencies" className="mt-0">
            {!mockedData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-[125px] w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : Object.keys(mockedData.currencies).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(mockedData.currencies).map((currency: Currencies) => (
                  <PriceCard
                    key={currency.code}
                    title={currency.name}
                    code={currency.code}
                    value={currency.buy || 0}
                    variation={currency.variation}
                    secondaryValue={currency.sell}
                    secondaryLabel="Sell"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Search className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">
                  No currencies match your search criteria
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="stocks" className="mt-0">
            {!mockedData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-[125px] w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : Object.keys(mockedData.stocks).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(mockedData.stocks).map((stock: Stocks) => (
                  <PriceCard
                    key={stock.code}
                    title={stock.name}
                    code={stock.code}
                    subtitle={stock.location}
                    value={stock.points}
                    variation={stock.variation}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Search className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">
                  No stocks match your search criteria
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bitcoin" className="mt-0">
            {!mockedData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-[125px] w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : Object.keys(mockedData.bitcoin).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(mockedData.bitcoin).map((exchange: Bitcoins) => (
                  <PriceCard
                    key={exchange.code}
                    title={exchange.name}
                    code={exchange.code}
                    subtitle={exchange.format?.join(' | ')}
                    value={exchange.last}
                    variation={exchange.variation}
                    secondaryValue={exchange.buy}
                    secondaryLabel="Buy"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Search className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground">
                  No bitcoin exchanges match your search criteria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;