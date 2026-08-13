import { create } from 'zustand';
import { PortfolioRiskMetrics, PortfolioApi } from '@/services/api/portfolioApi';

interface RiskStoreState {
  metrics: PortfolioRiskMetrics;
  isLoading: boolean;
  fetchRiskMetrics: () => Promise<void>;
}

export const useRiskStore = create<RiskStoreState>((set) => ({
  metrics: {
    healthScore: 88.0,
    sharpeRatio: 1.85,
    beta: 1.12,
    maxDrawdown: -12.4,
    volatility: 16.2,
    sortinoRatio: 2.40,
    treynorRatio: 14.2,
    valueAtRisk95: -3.2,
    expectedShortfall: -4.8,
  },
  isLoading: false,

  fetchRiskMetrics: async () => {
    try {
      set({ isLoading: true });
      const metrics = await PortfolioApi.getRiskMetrics();
      set({ metrics, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
