import { apiClient } from '@/api';

export interface ScreenerCandidate {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio: number;
  rsi: number;
  sector: string;
  opportunityScore: number;
  recommendation: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL';
  confidenceScore: number;
  patternMatch?: string;
}

export interface MarketRadarCategory {
  title: string;
  category: 'TOP_GAINERS' | 'BREAKOUTS' | 'OVERSOLD' | 'HIGH_VOLUME';
  tickers: Array<{
    symbol: string;
    price: number;
    changePercent: number;
    aiScore: number;
    signal: string;
  }>;
}

export interface SavedScreenerPreset {
  id: string;
  name: string;
  description: string;
  filtersJson: string;
  isPinned: boolean;
  createdAt: string;
}

export interface ScannerHistoryItem {
  id: string;
  scanType: string;
  matchedCount: number;
  timestamp: string;
}

export const ScreenerApi = {
  getRadars: async (): Promise<MarketRadarCategory[]> => {
    const response: any = await apiClient.get('/scanner');
    return response.data;
  },

  screenStocks: async (criteria: any): Promise<ScreenerCandidate[]> => {
    const response: any = await apiClient.post('/scanner/screen', criteria);
    return response.data;
  },

  getSavedPresets: async (): Promise<SavedScreenerPreset[]> => {
    const response: any = await apiClient.get('/scanner/saved');
    return response.data;
  },

  savePreset: async (name: string, description: string, filtersJson: string): Promise<SavedScreenerPreset> => {
    const response: any = await apiClient.post('/scanner/saved', { name, description, filtersJson });
    return response.data;
  },

  deletePreset: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/scanner/saved/${id}`);
    return response.data.deleted;
  },

  getHistory: async (): Promise<ScannerHistoryItem[]> => {
    const response: any = await apiClient.get('/scanner/history');
    return response.data;
  },
};
