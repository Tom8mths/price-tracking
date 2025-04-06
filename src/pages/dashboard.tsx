import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PriceCard from '@/components/PriceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Search, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Currency, Stock, BitcoinExchange } from '@/types/index';
import { useQuotes } from '@/context/QuotesContext';
import PriceChart from '@/components/PriceChart';

enum EntityType {
  CURRENCY = 'currency',
  STOCK = 'stock',
  BITCOIN = 'bitcoin'
}

type ChartEntity = {
  type: EntityType;
  code: string;
  name: string;
  variation: number;
};

const Dashboard = () => {
  const { quotes, loading, getHistoricalData } = useQuotes();
  const [selectedTab, setSelectedTab] = useState<'currencies' | 'stocks' | 'bitcoin'>('currencies');
  const [selectedEntity, setSelectedEntity] = useState<ChartEntity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEntitySelect = (type: EntityType, code: string, name: string, variation: number) => {
    setSelectedEntity({
      type,
      code,
      name,
      variation
    });
  };

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
                value={searchQuery}
                className="pr-10"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchQuery('')}
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

        {selectedEntity ? (
          <div className="mb-6">
            <PriceChart
              title={`${selectedEntity.name} (${selectedEntity.code})`}
              data={getHistoricalData(selectedEntity.type, selectedEntity.code)}
              variation={selectedEntity.variation}
            />
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEntity(null)}
              >
                Close Chart
              </Button>
            </div>
          </div>
        ) : null}
        
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
          
          { loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-[125px] w-full rounded-lg" />
                </div>
              ))}
            </div>
            ) : 
            <>
              <TabsContent value="currencies" className="mt-0">
                {!quotes ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-[125px] w-full rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : Object.keys(quotes?.currencies || {}).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(quotes?.currencies || {}).slice(1).map(([key, currency]: [string, Currency]) => (
                      <PriceCard
                        key={key}
                        title={currency.name}
                        code={key}
                        value={currency.buy || 0}
                        variation={currency.variation}
                        secondaryValue={currency.sell}
                        secondaryLabel="Sell"
                        onClick={() => handleEntitySelect(
                          EntityType.CURRENCY,
                          key,
                          currency.name,
                          currency.variation
                        )}
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
                {!quotes ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-[125px] w-full rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : Object.keys(quotes?.stocks || {}).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(quotes?.stocks || {}).map(([key, stock]: [string, Stock]) => (
                      <PriceCard
                        key={key}
                        title={stock.name}
                        code={key}
                        subtitle={stock.location}
                        value={stock.points}
                        variation={stock.variation}
                        onClick={() => handleEntitySelect(
                          EntityType.STOCK,
                          key,
                          stock.name,
                          stock.variation
                        )}
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
                {!quotes ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-[125px] w-full rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : Object.keys(quotes?.bitcoin || {}).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(quotes?.bitcoin || {}).map(([key, exchange]: [string, BitcoinExchange]) => (
                      <PriceCard
                        key={key}
                        title={exchange.name}
                        code={key}
                        subtitle={exchange.format?.join(' | ')}
                        value={exchange.last}
                        variation={exchange.variation}
                        secondaryValue={exchange.buy}
                        secondaryLabel="Buy"
                        onClick={() => handleEntitySelect(
                          EntityType.BITCOIN,
                          key,
                          exchange.name,
                          exchange.variation
                        )}
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
            </>
            }
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;