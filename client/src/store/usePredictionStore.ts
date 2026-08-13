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
  predictions: [
    {
      id: 'p1',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      currentPrice: 132.40,
      entryPrice: 130.50,
      targetPrice: 155.00,
      stopLoss: 124.00,
      confidenceScore: 94.8,
      signal: 'STRONG_BUY',
      timeframe: '1D',
      riskLevel: 'LOW',
      riskRewardRatio: 2.5,
      rationale: [
        'RSI (14) at 64.2 confirms bullish momentum above neutral 50 centerline.',
        'MACD histogram generated a bullish crossover above signal line on 4H timeframe.',
        'Price trades comfortably above 20-day and 50-day EMA support levels.',
        'Institutional volume spike measured at 2.4x historical 20-day average.',
        'Order book depth reveals $128.50 key resistance converted into strong support zone.',
      ],
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 224.50,
      entryPrice: 222.00,
      targetPrice: 245.00,
      stopLoss: 215.00,
      confidenceScore: 88.5,
      signal: 'BUY',
      timeframe: '1D',
      riskLevel: 'LOW',
      riskRewardRatio: 3.2,
      rationale: [
        'Quarterly services revenue growth trend acceleration.',
        'Volume breakout above 50-day moving average.',
      ],
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'p3',
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      currentPrice: 248.60,
      entryPrice: 245.00,
      targetPrice: 280.00,
      stopLoss: 232.00,
      confidenceScore: 91.2,
      signal: 'STRONG_BUY',
      timeframe: '4H',
      riskLevel: 'MEDIUM',
      riskRewardRatio: 2.7,
      rationale: [
        'Robotaxi event catalyst accumulation.',
        'Short interest squeeze threshold crossed.',
      ],
      updatedAt: new Date().toISOString(),
    },
  ],
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
    // Featured fetch
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
