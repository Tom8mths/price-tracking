import axios from 'axios';

const API_URL = '/api/finance';
const API_KEY = import.meta.env.VITE_API_KEY;
console.log('API_KEY', API_KEY);

export const getQuotation = async (currency: string) => {
  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}`);
    const data = response.data;
    if (data && data.results) { 
      return data.results[currency];
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    console.error('Error fetching quotation:', error);
    throw error;
  }
};