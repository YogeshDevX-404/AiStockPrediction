import { create } from 'zustand';
import { ConfidenceBreakdown, PredictionApi } from '@/services/api/predictionApi';

interface ConfidenceState {
  breakdown: ConfidenceBreakdown | null;
  isLoading: boolean;
  fetchBreakdown: (symbol: string) => Promise<void>;
}

export const useConfidenceStore = create<ConfidenceState>((set) => ({
  breakdown: {
    totalConfidence: 94.8,
    technicalWeight: 34.0,
    trendWeight: 24.5,
    volumeWeight: 19.8,
    volatilityWeight: 16.5,
  },
  isLoading: false,

  fetchBreakdown: async (symbol) => {
    try {
      set({ isLoading: true });
      const breakdown = await PredictionApi.getConfidenceBreakdown(symbol);
      set({ breakdown, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
