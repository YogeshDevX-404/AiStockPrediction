import { create } from 'zustand';
import { MarketOverviewResponse, MarketStatusResponse, MarketApi } from '@/services/api/marketApi';

interface MarketStoreState {
  overview: MarketOverviewResponse | null;
  status: MarketStatusResponse | null;
  isLoading: boolean;
  fetchOverview: () => Promise<void>;
  fetchStatus: () => Promise<void>;
}

export const useMarketStore = create<MarketStoreState>((set) => ({
  overview: null,
  status: null,
  isLoading: false,

  fetchOverview: async () => {
    try {
      set({ isLoading: true });
      const overview = await MarketApi.getOverview();
      set({ overview, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchStatus: async () => {
    try {
      const status = await MarketApi.getStatus();
      set({ status });
    } catch (err) {
      // Graceful fallback
    }
  },
}));
