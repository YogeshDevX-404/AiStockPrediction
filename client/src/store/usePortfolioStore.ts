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
    totalValue: 17084.00,
    totalInvestment: 14260.00,
    todayProfit: 412.50,
    todayProfitPercent: 2.47,
    overallProfit: 2824.00,
    overallProfitPercent: 19.80,
    cashBalance: 10000.00,
    totalHoldings: 4,
    riskScore: 2.1,
    diversificationScore: 88,
  },
  items: [
    {
      id: 'h1',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      exchange: 'NASDAQ',
      quantity: 50,
      avgBuyPrice: 105.20,
      currentPrice: 132.40,
      changePercent: 3.45,
      totalValue: 6620.00,
      profit: 1360.00,
      profitPercent: 25.85,
      purchaseDate: '2026-03-15',
      broker: 'Zerodha',
      notes: 'Long-term AI hardware position',
      signal: 'BUY',
    },
    {
      id: 'h2',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      exchange: 'NASDAQ',
      quantity: 30,
      avgBuyPrice: 195.00,
      currentPrice: 224.50,
      changePercent: 1.84,
      totalValue: 6735.00,
      profit: 885.00,
      profitPercent: 15.12,
      purchaseDate: '2026-02-10',
      broker: 'Groww',
      notes: 'Core tech allocation',
      signal: 'ACCUMULATE',
    },
    {
      id: 'h3',
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      exchange: 'NASDAQ',
      quantity: 15,
      avgBuyPrice: 210.00,
      currentPrice: 248.60,
      changePercent: 4.25,
      totalValue: 3729.00,
      profit: 579.00,
      profitPercent: 18.38,
      purchaseDate: '2026-04-01',
      broker: 'INDmoney',
      notes: 'EV momentum play',
      signal: 'HOLD',
    },
  ],
  isLoading: false,

  fetchPortfolio: async () => {
    try {
      set({ isLoading: true });
      const data = await PortfolioApi.getSummary();
      set({ summary: data.summary, items: data.holdings, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addHolding: async (holding) => {
    try {
      set({ isLoading: true });
      const newHolding = await PortfolioApi.addHolding(holding);
      set((state) => ({ items: [...state.items, newHolding], isLoading: false }));
    } catch {
      set({ isLoading: false });
    }
  },

  deleteHolding: async (id) => {
    try {
      set({ isLoading: true });
      await PortfolioApi.deleteHolding(id);
      set((state) => ({
        items: state.items.filter((h) => h.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },
}));
