import { create } from 'zustand';
import { MarketRadarCategory, ScreenerApi } from '@/services/api/screenerApi';

interface ScannerState {
  radars: MarketRadarCategory[];
  isLoading: boolean;
  fetchRadars: () => Promise<void>;
}

export const useScannerStore = create<ScannerState>((set) => ({
  radars: [
    {
      title: 'Top AI Growth Gainers',
      category: 'TOP_GAINERS',
      tickers: [
        { symbol: 'NVDA', price: 135.50, changePercent: 4.25, aiScore: 95.8, signal: 'STRONG_BUY' },
        { symbol: 'TSLA', price: 248.80, changePercent: 3.15, aiScore: 89.4, signal: 'BUY' },
        { symbol: 'TSM', price: 178.20, changePercent: 2.80, aiScore: 92.0, signal: 'BUY' },
      ],
    },
    {
      title: 'Technical Volume Breakouts',
      category: 'BREAKOUTS',
      tickers: [
        { symbol: 'AAPL', price: 224.30, changePercent: 0.95, aiScore: 87.2, signal: 'BUY' },
        { symbol: 'RELIANCE', price: 3020.50, changePercent: 0.95, aiScore: 86.0, signal: 'BUY' },
      ],
    },
  ],
  isLoading: false,

  fetchRadars: async () => {
    try {
      set({ isLoading: true });
      const radars = await ScreenerApi.getRadars();
      set({ radars, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
