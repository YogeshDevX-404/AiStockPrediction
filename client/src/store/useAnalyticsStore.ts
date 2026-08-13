import { create } from 'zustand';
import { PortfolioAnalyticsOutput, PerformanceReturnItem, PortfolioApi } from '@/services/api/portfolioApi';

interface AnalyticsStoreState {
  analytics: PortfolioAnalyticsOutput;
  performance: PerformanceReturnItem[];
  isLoading: boolean;
  fetchAnalyticsAndPerformance: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStoreState>((set) => ({
  analytics: {
    healthScore: 88.0,
    sharpeRatio: 1.85,
    beta: 1.12,
    maxDrawdown: -12.4,
    volatility: 16.2,
    rebalancingSuggestions: [
      'Reduce Semiconductor exposure by 8% to lock in +19.8% gains.',
      'Deploy 5% cash reserves into defensive Healthcare or High-Yield ETFs.',
    ],
    sectors: [
      { sector: 'Technology', percentage: 42.0, value: 7175.28, color: '#10b981' },
      { sector: 'Semiconductors', percentage: 28.0, value: 4783.52, color: '#a855f7' },
      { sector: 'Automotive & EV', percentage: 18.0, value: 3075.12, color: '#3b82f6' },
      { sector: 'Cash Reserves', percentage: 12.0, value: 2050.08, color: '#f59e0b' },
    ],
    scenarios: [
      { name: 'Broad Market Correction (-20% S&P 500)', impactPercent: -14.2, estimatedPnl: -2425.92, severity: 'HIGH' },
      { name: 'Tech Sector Rotation (-15% Semiconductors)', impactPercent: -8.5, estimatedPnl: -1452.14, severity: 'MEDIUM' },
      { name: 'Interest Rate Hike (+50 bps Fed Rate)', impactPercent: -4.1, estimatedPnl: -700.44, severity: 'LOW' },
      { name: 'Bull Market Rally (+15% Tech Surge)', impactPercent: +18.4, estimatedPnl: +3143.45, severity: 'LOW' },
    ],
  },
  performance: [
    { period: '1D', portfolioReturn: 1.45, benchmarkReturn: 0.85 },
    { period: '1W', portfolioReturn: 3.20, benchmarkReturn: 1.10 },
    { period: '1M', portfolioReturn: 8.40, benchmarkReturn: 3.20 },
    { period: '1Y', portfolioReturn: 28.50, benchmarkReturn: 18.20 },
    { period: 'ALL', portfolioReturn: 42.80, benchmarkReturn: 24.50 },
  ],
  isLoading: false,

  fetchAnalyticsAndPerformance: async () => {
    try {
      set({ isLoading: true });
      const analytics = await PortfolioApi.getAnalytics();
      const performance = await PortfolioApi.getPerformance();
      set({ analytics, performance, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
