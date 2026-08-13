import { create } from 'zustand';
import { DetectedCandlestick, CandlestickApi } from '@/services/api/candlestickApi';

interface CandlestickStoreState {
  candlesticks: DetectedCandlestick[];
  isAnalyzing: boolean;
  fetchCandlesticksForSymbol: (symbol: string) => Promise<void>;
  analyzeSymbol: (symbol: string) => Promise<void>;
}

export const useCandlestickStore = create<CandlestickStoreState>((set) => ({
  candlesticks: [
    {
      id: 'cd1',
      symbol: 'NVDA',
      patternName: 'Bullish Engulfing',
      type: 'MULTI',
      bias: 'BULLISH',
      confidenceScore: 92.5,
      entryZone: '$130.00 - $132.50',
      targetPrice: 155.00,
      stopLoss: 124.00,
      rationale: [
        'Long green body engulfs prior 3 red session bodies at key $128.50 support level.',
        'Volume surge registered at 2.4x 20-day exponential moving average during session close.',
        'RSI momentum indicator turned upwards from 48.2 oversold zone toward 64.2.',
        'Confirmation rule fulfilled: Follow-through buy volume confirmed above current high.',
      ],
    },
    {
      id: 'cd2',
      symbol: 'NVDA',
      patternName: 'Hammer Reversal',
      type: 'SINGLE',
      bias: 'BULLISH',
      confidenceScore: 88.0,
      entryZone: '$129.50 - $131.00',
      targetPrice: 148.00,
      stopLoss: 125.00,
      rationale: [
        'Long lower wick 2.5x body length demonstrates buyers aggressively absorbing selling pressure.',
      ],
    },
  ],
  isAnalyzing: false,

  fetchCandlesticksForSymbol: async (symbol) => {
    try {
      set({ isAnalyzing: true });
      const candlesticks = await CandlestickApi.getCandlesticksForSymbol(symbol);
      set({ candlesticks, isAnalyzing: false });
    } catch {
      set({ isAnalyzing: false });
    }
  },

  analyzeSymbol: async (symbol) => {
    try {
      set({ isAnalyzing: true });
      const candlesticks = await CandlestickApi.analyzeCandlesticks(symbol);
      set({ candlesticks, isAnalyzing: false });
    } catch {
      set({ isAnalyzing: false });
    }
  },
}));
