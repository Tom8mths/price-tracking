import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getQuotation } from "../services/api";
import { ApiResponse } from "../types/index";


type QuotesContextType = ApiResponse & {
  quotes: ApiResponse | null;
  loading: boolean;
  error: string | null;
  getHistoricalData: (type: 'currency' | 'stock' | 'bitcoin', code: string) => HistoricalDataPoint[];
};

export type HistoricalDataPoint = {
  date: string;
  value: number;
};

const QuotesContext = createContext<QuotesContextType | null>(null);

export const QuotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log('quotes', quotes);
  

  const fetchQuotes = async () => {
    try {
      const data = await getQuotation();

      if (!data) {
        setError("No data found");
        setLoading(false);
        return;
      }

      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setError("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const generateHistoricalData = (
    type: 'currency' | 'stock' | 'bitcoin',
    code: string,
    days = 30
  ): HistoricalDataPoint[] => {
    let baseValue = 0;
    let volatility = 0;

    if (type === 'currency' && quotes?.currencies) {
      const currency = quotes.currencies[code];
      baseValue = currency?.buy || 0;
      volatility = 0.02;
    } else if (type === 'stock' && quotes?.stocks) {
      const stock = quotes.stocks[code];
      baseValue = stock?.points || 0;
      volatility = 0.03;
    } else if (type === 'bitcoin' && quotes?.bitcoin) {
      const bitcoin = quotes.bitcoin[code];
      baseValue = bitcoin?.last || 0;
      volatility = 0.05;
    }

    const today = new Date();
    const result: HistoricalDataPoint[] = [];

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const change = (Math.random() - 0.5) * 2 * volatility;
      baseValue = baseValue * (1 + change);
      
      result.push({
        date: date.toISOString().split('T')[0],
        value: parseFloat(baseValue.toFixed(4))
      });
    }

    return result;
  };


  const getHistoricalData = (
    type: 'currency' | 'stock' | 'bitcoin',
    code: string
  ): HistoricalDataPoint[] => {
    return generateHistoricalData(type, code);
  };

  return (
    <QuotesContext.Provider
      value={{
        ...quotes,
        quotes,
        loading,
        error,
        getHistoricalData
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
};
