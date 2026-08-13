import { create } from 'zustand';
import { StockQuote } from '@/types';
import { MarketApi } from '@/services/api/marketApi';

interface QuoteStoreState {
  quotes: Record<string, StockQuote>;
  isLoading: Record<string, boolean>;
  fetchQuote: (symbol: string) => Promise<StockQuote | null>;
  updateQuoteLocally: (symbol: string, partial: Partial<StockQuote>) => void;
}

export const useQuoteStore = create<QuoteStoreState>((set, get) => ({
  quotes: {},
  isLoading: {},

  fetchQuote: async (symbol: string) => {
    const sym = symbol.toUpperCase();
    try {
      set((state) => ({ isLoading: { ...state.isLoading, [sym]: true } }));
      const quote = await MarketApi.getQuote(sym);
      set((state) => ({
        quotes: { ...state.quotes, [sym]: quote },
        isLoading: { ...state.isLoading, [sym]: false },
      }));
      return quote;
    } catch {
      set((state) => ({ isLoading: { ...state.isLoading, [sym]: false } }));
      return get().quotes[sym] || null;
    }
  },

  updateQuoteLocally: (symbol: string, partial: Partial<StockQuote>) => {
    const sym = symbol.toUpperCase();
    set((state) => {
      const existing = state.quotes[sym];
      if (!existing) return state;
      return {
        quotes: {
          ...state.quotes,
          [sym]: { ...existing, ...partial },
        },
      };
    });
  },
}));
