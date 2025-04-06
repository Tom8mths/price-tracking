import { financeApi } from './api';

const API_KEY = import.meta.env.VITE_API_KEY;

export const QuotesService = {
  getQuotation: async () => {
    try {
      const response = await financeApi.get(`/finance?key=${API_KEY}`);
      const data = response.data;
      if (data?.results) {
        return data.results;
      }
    } catch (error) {
      console.error('Error fetching quotation:', error);
      throw error;
    }
  },
};
