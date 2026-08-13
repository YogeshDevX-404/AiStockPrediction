import { apiClient } from '@/api';

export interface SmartWatchlistItem {
  id: string;
  watchlistId: string;
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  sparkline: number[];
  marketStatus: 'OPEN' | 'CLOSED';
  signal: 'BUY' | 'ACCUMULATE' | 'HOLD' | 'SELL';
  confidence: number;
  rsi: number;
  macdStatus: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'NEUTRAL';
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  riskScore: number;
  hasActiveAlert: boolean;
  addedAt: string;
}

export interface WatchlistGroup {
  id: string;
  name: string;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  itemCount: number;
}

export interface AIWatchlistRadar {
  bestBuyToday: { symbol: string; confidence: number; upside: string };
  bestSellToday: { symbol: string; confidence: number; downside: string };
  breakoutCandidate: { symbol: string; resistance: string };
  oversoldStock: { symbol: string; rsi: number };
  volumeSpikeStock: { symbol: string; volumeMultiplier: string };
}

export interface PriceAlertItem {
  id: string;
  symbol: string;
  condition: string;
  targetValue: number;
  triggered: boolean;
  createdAt: string;
}

export const WatchlistApi = {
  getWatchlists: async (): Promise<WatchlistGroup[]> => {
    const response: any = await apiClient.get('/watchlists');
    return response.data;
  },

  getWatchlistItems: async (watchlistId?: string): Promise<SmartWatchlistItem[]> => {
    const response: any = await apiClient.get(`/watchlists/${watchlistId || 'w1'}`);
    return response.data;
  },

  createWatchlist: async (name: string): Promise<WatchlistGroup> => {
    const response: any = await apiClient.post('/watchlists', { name });
    return response.data;
  },

  addItem: async (watchlistId: string, symbol: string): Promise<SmartWatchlistItem> => {
    const response: any = await apiClient.post('/watchlists/items', { watchlistId, symbol });
    return response.data;
  },

  deleteItem: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/watchlists/items/${id}`);
    return response.data.deleted;
  },

  getRadar: async (): Promise<AIWatchlistRadar> => {
    const response: any = await apiClient.get('/watchlists/radar');
    return response.data;
  },
};
