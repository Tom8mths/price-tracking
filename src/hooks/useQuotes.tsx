import { createContext, useContext, useEffect, useState } from "react";
import { getQuotation } from "../services/api";
import { ApiResponse } from "../types/index";

const QuotesContext = createContext<ApiResponse | null>(null);

import { ReactNode } from "react";

export const QuotesProvider = ({ children }: { children: ReactNode }) => {
  const [quotes, setQuotes] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getQuotation();

        if (!data) return;
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
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