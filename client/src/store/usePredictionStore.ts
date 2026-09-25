import { create } from 'zustand';
import { DetailedPrediction, PredictionApi } from '@/services/api/predictionApi';

interface PredictionStoreState {
  predictions: DetailedPrediction[];
  activeTimeframeFilter: string; // 15m | 30m | 1h | 4h | 1d | 1w | 1m
  isLoading: boolean;
  setActiveTimeframeFilter: (tf: string) => void;
  fetchPredictionForSymbol: (symbol: string) => Promise<DetailedPrediction | null>;
  fetchFeaturedPredictions: () => Promise<void>;
  analyzeSymbolOnDemand: (symbol: string) => Promise<DetailedPrediction | null>;
}

export const usePredictionStore = create<PredictionStoreState>((set, get) => ({
  predictions: [],
  activeTimeframeFilter: '1D',
  isLoading: false,

  setActiveTimeframeFilter: (activeTimeframeFilter) => set({ activeTimeframeFilter }),

  fetchPredictionForSymbol: async (symbol) => {
    try {
      set({ isLoading: true });
      const prediction = await PredictionApi.getPrediction(symbol);
      set({ isLoading: false });
      return prediction;
    } catch {
      set({ isLoading: false });
      return null;
    }
  },

  fetchFeaturedPredictions: async () => {
    try {
      set({ isLoading: true });
      const symbols = ['NVDA', 'AAPL', 'TSLA'];
      const results = await Promise.all(
        symbols.map(async (s) => {
          try {
            return await PredictionApi.getPrediction(s);
          } catch {
            return null;
          }
        })
      );
      const valid = results.filter((p): p is DetailedPrediction => p !== null);
      set({ predictions: valid, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  analyzeSymbolOnDemand: async (symbol) => {
    try {
      set({ isLoading: true });
      const prediction = await PredictionApi.analyze(symbol);
      set((state) => ({
        predictions: [prediction, ...state.predictions.filter((p) => p.symbol !== prediction.symbol)],
        isLoading: false,
      }));
      return prediction;
    } catch {
      set({ isLoading: false });
      return null;
    }
  },
}));
