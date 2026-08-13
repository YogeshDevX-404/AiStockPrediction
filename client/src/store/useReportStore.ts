import { create } from 'zustand';
import { StrategyExecutiveReport, StrategyApi } from '@/services/api/strategyApi';

interface ReportStoreState {
  report: StrategyExecutiveReport;
  isLoading: boolean;
  fetchReport: () => Promise<void>;
}

export const useReportStore = create<ReportStoreState>((set) => ({
  report: {
    executiveSummary: 'Strategy displays robust risk-adjusted returns with a Profit Factor of 2.45 and low maximum drawdown (-12.4%).',
    strengths: [
      'High Win Rate (74.2%) across trending bull regimes.',
      'Effective RSI oversold filter prevents entering overextended moves.',
    ],
    weaknesses: [
      'Slight performance decay during sideways rangebound consolidation.',
    ],
    overfittingRisk: 'LOW',
    recommendations: [
      'Consider adding a Volatility ADX filter (>25) to avoid choppy sideways markets.',
      'Increase trailing stop to lock in profits on multi-day breakouts.',
    ],
  },
  isLoading: false,

  fetchReport: async () => {
    try {
      set({ isLoading: true });
      const report = await StrategyApi.getReport();
      set({ report, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
