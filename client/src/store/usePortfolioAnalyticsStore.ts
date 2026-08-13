import { create } from 'zustand';
import { PortfolioAnalytics, PortfolioApi } from '@/services/api/portfolioApi';

interface PortfolioAnalyticsState {
  analytics: PortfolioAnalytics | null;
  isLoading: boolean;
  fetchAnalytics: () => Promise<void>;
}

export const usePortfolioAnalyticsStore = create<PortfolioAnalyticsState>((set) => ({
  analytics: {
    healthScore: 88,
    riskScore: 2.1,
    diversificationScore: 88,
    sharpeRatio: 1.85,
    beta: 1.12,
    maxDrawdown: -12.4,
    volatility: 16.2,
    topPerformer: { symbol: 'NVDA', profitPercent: 25.85 },
    worstPerformer: { symbol: 'RELIANCE', profitPercent: 5.98 },
    rebalancingRecommendations: [
      { type: 'BUY', symbol: 'TSM', reason: 'High foundry capacity utilization; increases chip sector moat.' },
      { type: 'SELL', symbol: 'INTC', reason: 'Declining margin trends vs GPU competitors.' },
    ],
    rebalancingSuggestions: [
      'Reduce Semiconductor exposure by 8% to lock in +19.8% gains.',
    ],
  },
  isLoading: false,

  fetchAnalytics: async () => {
    try {
      set({ isLoading: true });
      const analyticsOutput = await PortfolioApi.getAnalytics();
      set({
        analytics: {
          healthScore: analyticsOutput.healthScore,
          sharpeRatio: analyticsOutput.sharpeRatio || 1.85,
          beta: analyticsOutput.beta || 1.12,
          maxDrawdown: analyticsOutput.maxDrawdown || -12.4,
          volatility: analyticsOutput.volatility || 16.2,
          rebalancingSuggestions: analyticsOutput.rebalancingSuggestions,
          sectors: analyticsOutput.sectors,
          scenarios: analyticsOutput.scenarios,
        },
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
