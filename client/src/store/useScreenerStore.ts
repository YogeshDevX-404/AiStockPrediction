import { create } from 'zustand';
import { ScreenerCandidate, ScreenerApi } from '@/services/api/screenerApi';

interface ScreenerFilterCriteria {
  minRsi: number;
  maxRsi: number;
  maxPe: number;
  sector: string;
  goldenCrossOnly: boolean;
}

interface ScreenerStoreState {
  candidates: ScreenerCandidate[];
  criteria: ScreenerFilterCriteria;
  isScreening: boolean;
  setCriteria: (criteria: Partial<ScreenerFilterCriteria>) => void;
  resetCriteria: () => void;
  runScreening: () => Promise<void>;
}

const defaultCriteria: ScreenerFilterCriteria = {
  minRsi: 30,
  maxRsi: 70,
  maxPe: 80,
  sector: 'All',
  goldenCrossOnly: false,
};

export const useScreenerStore = create<ScreenerStoreState>((set, get) => ({
  candidates: [
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 135.50, changePercent: 4.25, volume: '48.2M', marketCap: '$3.34T', peRatio: 72.4, rsi: 64.2, sector: 'Technology', opportunityScore: 95.8, recommendation: 'STRONG_BUY', confidenceScore: 94.5, patternMatch: 'Bull Flag Breakout' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', price: 178.20, changePercent: 2.80, volume: '18.4M', marketCap: '$924B', peRatio: 28.5, rsi: 58.1, sector: 'Semiconductors', opportunityScore: 92.0, recommendation: 'BUY', confidenceScore: 91.0, patternMatch: 'Golden Cross' },
    { symbol: 'TSLA', name: 'Tesla Inc', price: 248.80, changePercent: 3.15, volume: '34.1M', marketCap: '$792B', peRatio: 64.8, rsi: 48.9, sector: 'Automotive', opportunityScore: 89.4, recommendation: 'BUY', confidenceScore: 88.0, patternMatch: 'Hammer Reversal' },
    { symbol: 'AAPL', name: 'Apple Inc', price: 224.30, changePercent: 0.95, volume: '29.5M', marketCap: '$3.42T', peRatio: 34.2, rsi: 52.4, sector: 'Technology', opportunityScore: 87.2, recommendation: 'BUY', confidenceScore: 89.2, patternMatch: 'Cup & Handle' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3020.50, changePercent: 0.95, volume: '8.4M', marketCap: '₹20.4T', peRatio: 26.8, rsi: 54.0, sector: 'Energy', opportunityScore: 86.0, recommendation: 'BUY', confidenceScore: 85.5, patternMatch: 'Ascending Triangle' },
  ],
  criteria: defaultCriteria,
  isScreening: false,

  setCriteria: (newCriteria) => {
    set((state) => ({ criteria: { ...state.criteria, ...newCriteria } }));
  },

  resetCriteria: () => {
    set({ criteria: defaultCriteria });
    get().runScreening();
  },

  runScreening: async () => {
    try {
      set({ isScreening: true });
      const candidates = await ScreenerApi.screenStocks(get().criteria);
      set({ candidates, isScreening: false });
    } catch {
      set({ isScreening: false });
    }
  },
}));
