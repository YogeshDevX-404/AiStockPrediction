import { create } from 'zustand';
import { PredictionHistoryItem, PredictionApi } from '@/services/api/predictionApi';

interface HistoryState {
  history: PredictionHistoryItem[];
  isLoading: boolean;
  fetchHistory: () => Promise<void>;
}

export const usePredictionHistoryStore = create<HistoryState>((set) => ({
  history: [
    { id: 'ph1', predictionId: 'p1', symbol: 'NVDA', signal: 'STRONG_BUY', confidenceScore: 94.8, actualOutcome: 'WIN', pnlPercent: 18.4, timestamp: '2026-03-20' },
    { id: 'ph2', predictionId: 'p2', symbol: 'AAPL', signal: 'BUY', confidenceScore: 88.5, actualOutcome: 'WIN', pnlPercent: 12.1, timestamp: '2026-03-15' },
    { id: 'ph3', predictionId: 'p3', symbol: 'TSLA', signal: 'BUY', confidenceScore: 91.2, actualOutcome: 'WIN', pnlPercent: 15.2, timestamp: '2026-04-01' },
    { id: 'ph4', predictionId: 'p4', symbol: 'INTC', signal: 'SELL', confidenceScore: 82.4, actualOutcome: 'WIN', pnlPercent: -8.5, timestamp: '2026-02-18' },
  ],
  isLoading: false,

  fetchHistory: async () => {
    try {
      set({ isLoading: true });
      const history = await PredictionApi.getHistory();
      set({ history, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
