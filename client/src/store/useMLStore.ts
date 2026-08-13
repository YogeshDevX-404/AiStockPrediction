import { create } from 'zustand';
import { ModelDriftMetrics, MLApi } from '@/services/api/mlApi';

interface MLStoreState {
  metrics: ModelDriftMetrics;
  isLoading: boolean;
  fetchMetrics: () => Promise<void>;
}

export const useMLStore = create<MLStoreState>((set) => ({
  metrics: {
    featureDriftScore: 0.024,
    predictionDriftScore: 0.018,
    accuracyDriftPercent: -0.4,
    averageLatencyMs: 14.5,
    totalInferenceRequests: 142800,
  },
  isLoading: false,

  fetchMetrics: async () => {
    try {
      set({ isLoading: true });
      const metrics = await MLApi.getMetrics();
      set({ metrics, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
