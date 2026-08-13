import { create } from 'zustand';
import { FinancialsResponse, StocksApi } from '@/services/api/stocksApi';

interface FinancialsState {
  financials: FinancialsResponse | null;
  activeTab: 'income' | 'balance' | 'cashflow' | 'quarterly';
  isLoading: boolean;
  setActiveTab: (tab: 'income' | 'balance' | 'cashflow' | 'quarterly') => void;
  fetchFinancials: (symbol: string) => Promise<void>;
}

export const useFinancialsStore = create<FinancialsState>((set) => ({
  financials: null,
  activeTab: 'income',
  isLoading: false,

  setActiveTab: (activeTab) => set({ activeTab }),

  fetchFinancials: async (symbol: string) => {
    try {
      set({ isLoading: true });
      const financials = await StocksApi.getFinancials(symbol);
      set({ financials, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
