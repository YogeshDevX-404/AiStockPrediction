import { create } from 'zustand';
import { DetectedPattern, PatternApi } from '@/services/api/patternApi';

interface PatternStoreState {
  detectedPatterns: DetectedPattern[];
  isScanning: boolean;
  fetchPatternsForSymbol: (symbol: string) => Promise<void>;
  scanPatterns: (symbol: string) => Promise<void>;
}

export const usePatternStore = create<PatternStoreState>((set) => ({
  detectedPatterns: [
    {
      id: 'pat1',
      symbol: 'NVDA',
      patternName: 'Bull Flag Consolidation',
      category: 'CONTINUATION',
      direction: 'BULLISH',
      confidenceScore: 92.4,
      strength: 'HIGH',
      timeframe: '1D',
      targetMovePercent: 14.8,
      rationale: [
        'Geometric structure matches Bull Flag Consolidation setup across 48 candle periods.',
        'Volume contraction during flag pole consolidation followed by 2.4x breakout spike.',
        'Upper resistance trendline breached at $130.50 with strong body candle close.',
        'Historical backtest reliability demonstrates 84.5% win rate across tech equities.',
      ],
    },
    {
      id: 'pat2',
      symbol: 'NVDA',
      patternName: 'Bullish Engulfing Candle',
      category: 'CANDLESTICK',
      direction: 'BULLISH',
      confidenceScore: 88.6,
      strength: 'HIGH',
      timeframe: '1D',
      targetMovePercent: 8.2,
      rationale: [
        'Engulfing body completely covers previous red candle range at major EMA 50 support.',
      ],
    },
    {
      id: 'pat3',
      symbol: 'TSLA',
      patternName: 'Cup & Handle',
      category: 'CONTINUATION',
      direction: 'BULLISH',
      confidenceScore: 94.0,
      strength: 'HIGH',
      timeframe: '4H',
      targetMovePercent: 18.4,
      rationale: [
        'U-shaped recovery cup pattern completed with tight handle consolidation at $245.',
      ],
    },
  ],
  isScanning: false,

  fetchPatternsForSymbol: async (symbol) => {
    try {
      set({ isScanning: true });
      const patterns = await PatternApi.getPatternsForSymbol(symbol);
      set({ detectedPatterns: patterns, isScanning: false });
    } catch {
      set({ isScanning: false });
    }
  },

  scanPatterns: async (symbol) => {
    try {
      set({ isScanning: true });
      const patterns = await PatternApi.scanPatterns(symbol);
      set({ detectedPatterns: patterns, isScanning: false });
    } catch {
      set({ isScanning: false });
    }
  },
}));
