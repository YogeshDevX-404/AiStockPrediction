import { create } from 'zustand';
import { ProbabilisticForecastOutput, SHAPFeatureImportance, MLApi } from '@/services/api/mlApi';
import { toast } from 'react-hot-toast';

interface InferenceStoreState {
  forecast: ProbabilisticForecastOutput;
  shap: SHAPFeatureImportance[];
  isLoading: boolean;
  runInference: (symbol: string, timeframe: string) => Promise<void>;
}

export const useInferenceStore = create<InferenceStoreState>((set) => ({
  forecast: {
    symbol: 'NVDA',
    timeframe: '1D',
    predictedDirection: 'BULLISH',
    expectedReturn: 4.25,
    lowerBound95: 1.50,
    upperBound95: 7.00,
    confidenceScore: 91.4,
    horizon: '24 Hours',
  },
  shap: [
    { feature: 'RSI(14) Momentum', importanceScore: 0.34, impactDirection: 'POSITIVE' },
    { feature: 'FinBERT Sentiment Score', importanceScore: 0.28, impactDirection: 'POSITIVE' },
    { feature: 'Volume Spike Ratio', importanceScore: 0.18, impactDirection: 'POSITIVE' },
    { feature: 'EMA(50) Trend Line', importanceScore: 0.12, impactDirection: 'POSITIVE' },
    { feature: 'Bollinger Band Width', importanceScore: 0.08, impactDirection: 'NEGATIVE' },
  ],
  isLoading: false,

  runInference: async (symbol, timeframe) => {
    try {
      set({ isLoading: true });
      const res = await MLApi.predict(symbol, timeframe);
      set({ forecast: res.forecast, shap: res.shap, isLoading: false });
      toast.success(`Generated probabilistic forecast for $${symbol.toUpperCase()}!`);
    } catch {
      set({ isLoading: false });
      toast.error('Inference pipeline failed.');
    }
  },
}));
