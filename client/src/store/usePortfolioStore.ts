import { create } from 'zustand';
import { PortfolioSummary, HoldingItem, PortfolioApi } from '@/services/api/portfolioApi';

interface PortfolioStoreState {
  summary: PortfolioSummary;
  items: HoldingItem[];
  isLoading: boolean;
  fetchPortfolio: () => Promise<void>;
  addHolding: (holding: Partial<HoldingItem>) => Promise<void>;
  deleteHolding: (id: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStoreState>((set, get) => ({
  summary: {
    id: 'p1',
    name: 'Primary Portfolio',
    isDefault: true,
    totalValue: 0.00,
    totalInvestment: 0.00,
    todayProfit: 0.00,
    todayProfitPercent: 0.00,
    overallProfit: 0.00,
    overallProfitPercent: 0.00,
    cashBalance: 0.00,
    totalHoldings: 0,
    riskScore: 0,
    diversificationScore: 0,
  },
  items: [],
  isLoading: false,

  fetchPortfolio: async () => {
    try {
      set({ isLoading: true });
      const data = await PortfolioApi.getSummary();
      if (data && data.summary) {
        set({ summary: data.summary, items: data.holdings || [], isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  addHolding: async (holding) => {
    try {
      set({ isLoading: true });
      await PortfolioApi.addHolding(holding);
      await get().fetchPortfolio();
    } catch {
      set({ isLoading: false });
    }
  },

  deleteHolding: async (id) => {
    try {
      set({ isLoading: true });
      await PortfolioApi.deleteHolding(id);
      await get().fetchPortfolio();
    } catch {
      set({ isLoading: false });
    }
  },
}));
