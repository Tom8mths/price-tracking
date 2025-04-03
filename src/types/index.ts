export interface Currency {
  name: string;
  buy: number;
  sell: number | null;
  variation: number;
}

export interface Stock {
  name: string;
  location: string;
  points: number;
  variation: number;
}

export interface BitcoinExchange {
  name: string;
  format: string[];
  last: number;
  buy?: number;
  sell?: number;
  variation: number;
}

export interface Tax {
  date: string;
  cdi: number;
  selic: number;
  daily_factor: number;
  selic_daily: number;
  cdi_daily: number;
}

export interface ApiResponse {
  currencies: Record<string, Currency>;
  stocks: Record<string, Stock>;
  available_sources: string[];
  bitcoin: Record<string, BitcoinExchange>;
  taxes: Tax[];
}

export interface Currencies {
  source: string;
  [key: string]: Currency | string;
};
export interface Stocks {
  [key: string]: Stock | string;
};
export interface Bitcoins {
  [key: string]: BitcoinExchange | string;
};