import { create } from 'zustand';
import { PatternStatisticItem, PatternApi } from '@/services/api/patternApi';

interface StatisticsState {
  statistics: PatternStatisticItem[];
  isLoading: boolean;
  fetchStatistics: () => Promise<void>;
}

export const usePatternStatisticsStore = create<StatisticsState>((set) => ({
  statistics: [
    { id: 'stat1', patternName: 'Bull Flag Consolidation', category: 'CONTINUATION', historicalSuccessRate: 84.5, avgMovePercent: 14.8, occurrences: 450 },
    { id: 'stat2', patternName: 'Cup & Handle', category: 'CONTINUATION', historicalSuccessRate: 88.2, avgMovePercent: 18.4, occurrences: 320 },
    { id: 'stat3', patternName: 'Inverse Head & Shoulders', category: 'REVERSAL', historicalSuccessRate: 82.0, avgMovePercent: 16.5, occurrences: 280 },
    { id: 'stat4', patternName: 'Bullish Engulfing Candle', category: 'CANDLESTICK', historicalSuccessRate: 79.4, avgMovePercent: 8.2, occurrences: 890 },
  ],
  isLoading: false,

  fetchStatistics: async () => {
    try {
      set({ isLoading: true });
      const statistics = await PatternApi.getStatistics();
      set({ statistics, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
