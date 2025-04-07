import { api } from './api';

export const QuotesService = {
  getQuotation: async () => {
    try {
      const response = await api.get(`/external`);
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
