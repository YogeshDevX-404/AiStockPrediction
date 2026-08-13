import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchItem, MarketApi } from '@/services/api/marketApi';

interface SearchStoreState {
  query: string;
  results: SearchItem[];
  recentSearches: string[];
  trendingSymbols: string[];
  isSearching: boolean;
  setQuery: (query: string) => void;
  executeSearch: (query: string) => Promise<void>;
  addRecentSearch: (symbol: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStoreState>()(
  persist(
    (set) => ({
      query: '',
      results: [],
      recentSearches: ['NVDA', 'AAPL', 'TSLA', 'BTC/USD', 'RELIANCE'],
      trendingSymbols: ['NVDA', 'AAPL', 'TSLA', 'MSFT', 'BTC/USD', 'ETH/USD'],
      isSearching: false,

      setQuery: (query: string) => set({ query }),

      executeSearch: async (query: string) => {
        if (!query.trim()) {
          set({ results: [], isSearching: false });
          return;
        }

        try {
          set({ isSearching: true });
          const results = await MarketApi.searchSymbols(query);
          set({ results, isSearching: false });
        } catch {
          set({ isSearching: false });
        }
      },

      addRecentSearch: (symbol: string) => {
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== symbol);
          return { recentSearches: [symbol, ...filtered].slice(0, 10) };
        });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'tradegenius-search-store',
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);
