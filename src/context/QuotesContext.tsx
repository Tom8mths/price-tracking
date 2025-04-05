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

  const getHistoricalData = (type: 'currency' | 'stock' | 'bitcoin', code: string): HistoricalDataPoint[] => {
    if (!quotes) return [];

    const keyMap = {
      currency: 'currencies',
      stock: 'stocks',
      bitcoin: 'bitcoin',
    } as const;

    const dataKey = keyMap[type];
  
    const dataset = quotes[dataKey]?.[code];

    console.log('dataset', dataset);
    console.log('type', type);
    console.log('code', code);
    

    if (!dataset || !('history' in dataset)) return [];
  
    return dataset.history as HistoricalDataPoint[];
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
