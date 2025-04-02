import { createContext, useContext, useEffect, useState } from "react";
import { getQuotation } from "../services/api";

const QuotesContext = createContext([]);

import { ReactNode } from "react";

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await getQuotation('USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL');
      if (!data) return;
      setQuotes(data);
    };

    fetchQuotes();
  }, []);

  return (
    <QuotesContext.Provider value={quotes}>
      {children}
    </QuotesContext.Provider>
  );
};

export const useQuotes = () => useContext(QuotesContext);
