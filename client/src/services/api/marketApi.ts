import { apiClient } from '@/api';
import { StockQuote } from '@/types';

export interface HistoricalPoint {
  timestamp: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SearchItem {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  region: string;
  currency: string;
}

export interface MarketOverviewResponse {
  indices: { symbol: string; name: string; price: string; change: string; changePercent: number; isOpen: boolean }[];
  crypto: { symbol: string; name: string; price: string; changePercent: number }[];
  commodities: { symbol: string; name: string; price: string; changePercent: number }[];
}

export interface MarketStatusResponse {
  markets: { region: string; name: string; status: 'OPEN' | 'CLOSED' | 'PRE_MARKET' | 'AFTER_HOURS'; lastUpdated: string }[];
}

export const MarketApi = {
  getQuote: async (symbol: string): Promise<StockQuote> => {
    const response: any = await apiClient.get(`/market/quote/${symbol}`);
    return response.data;
  },

  getHistoricalData: async (symbol: string, timeframe: string = '1D'): Promise<HistoricalPoint[]> => {
    const response: any = await apiClient.get(`/market/history/${symbol}`, {
      params: { timeframe },
    });
    return response.data;
  },

  searchSymbols: async (query: string): Promise<SearchItem[]> => {
    const response: any = await apiClient.get('/market/search', {
      params: { q: query },
    });
    return response.data;
  },

  getOverview: async (): Promise<MarketOverviewResponse> => {
    const response: any = await apiClient.get('/market/overview');
    return response.data;
  },

  getStatus: async (): Promise<MarketStatusResponse> => {
    const response: any = await apiClient.get('/market/status');
    return response.data;
  },
};
