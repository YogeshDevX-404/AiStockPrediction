import { create } from 'zustand';
import { PatternHistoryItem, PatternApi } from '@/services/api/patternApi';

interface HistoryState {
  history: PatternHistoryItem[];
  isLoading: boolean;
  fetchHistory: () => Promise<void>;
}

export const usePatternHistoryStore = create<HistoryState>((set) => ({
  history: [
    { id: 'path1', symbol: 'NVDA', patternName: 'Bull Flag Consolidation', confidenceScore: 92.4, actualOutcome: 'SUCCESS', realizedPnlPercent: 18.2, timestamp: '2026-03-22' },
    { id: 'path2', symbol: 'TSLA', patternName: 'Cup & Handle', confidenceScore: 94.0, actualOutcome: 'SUCCESS', realizedPnlPercent: 15.6, timestamp: '2026-03-18' },
    { id: 'path3', symbol: 'AAPL', patternName: 'Ascending Triangle', confidenceScore: 88.5, actualOutcome: 'SUCCESS', realizedPnlPercent: 11.4, timestamp: '2026-03-10' },
  ],
  isLoading: false,

  fetchHistory: async () => {
    try {
      set({ isLoading: true });
      const history = await PatternApi.getHistory();
      set({ history, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
