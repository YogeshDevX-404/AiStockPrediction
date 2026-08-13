import { create } from 'zustand';
import { StockQuote } from '@/types';
import {
  KeyStatistics,
  CompanyProfileResponse,
  AnalystRatingsResponse,
  StocksApi,
} from '@/services/api/stocksApi';

interface StockDetailsState {
  currentSymbol: string | null;
  quote: StockQuote | null;
  statistics: KeyStatistics | null;
  profile: CompanyProfileResponse | null;
  analystRatings: AnalystRatingsResponse | null;
  news: any[];
  isLoading: boolean;
  fetchStockAll: (symbol: string) => Promise<void>;
}

export const useStockDetailsStore = create<StockDetailsState>((set) => ({
  currentSymbol: null,
  quote: null,
  statistics: null,
  profile: null,
  analystRatings: null,
  news: [],
  isLoading: false,

  fetchStockAll: async (symbol: string) => {
    const sym = symbol.toUpperCase();
    try {
      set({ currentSymbol: sym, isLoading: true });

      const [quote, statistics, profile, analystRatings, news] = await Promise.all([
        StocksApi.getDetails(sym),
        StocksApi.getStatistics(sym),
        StocksApi.getProfile(sym),
        StocksApi.getAnalystRatings(sym),
        StocksApi.getNews(sym),
      ]);

      set({
        quote,
        statistics,
        profile,
        analystRatings,
        news,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
