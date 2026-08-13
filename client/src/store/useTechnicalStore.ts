import { create } from 'zustand';

export interface TechnicalIndicators {
  rsi: { value: number; signal: 'OVERBOUGHT' | 'OVERSOLD' | 'NEUTRAL' };
  macd: { value: number; signalLine: number; histogram: number; signal: 'BULLISH_CROSS' | 'BEARISH_CROSS' };
  ema20: number;
  ema50: number;
  ema200: number;
  sma50: number;
  atr: number;
  adx: { value: number; trendStrength: string };
  vwap: number;
  bollingerBands: { upper: number; middle: number; lower: number };
  supportLevels: number[];
  resistanceLevels: number[];
  overallTrend: 'STRONG_BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'STRONG_BEARISH';
}

interface TechnicalState {
  indicators: TechnicalIndicators;
  fetchTechnicals: (symbol: string) => void;
}

export const useTechnicalStore = create<TechnicalState>((set) => ({
  indicators: {
    rsi: { value: 64.2, signal: 'NEUTRAL' },
    macd: { value: 3.42, signalLine: 2.85, histogram: 0.57, signal: 'BULLISH_CROSS' },
    ema20: 130.20,
    ema50: 124.50,
    ema200: 112.80,
    sma50: 125.10,
    atr: 4.82,
    adx: { value: 34.5, trendStrength: 'STRONG_TREND' },
    vwap: 131.80,
    bollingerBands: { upper: 138.40, middle: 130.50, lower: 122.60 },
    supportLevels: [128.50, 124.00, 118.20],
    resistanceLevels: [136.00, 140.76, 145.00],
    overallTrend: 'STRONG_BULLISH',
  },

  fetchTechnicals: (symbol: string) => {
    // Dynamic calculation simulation
  },
}));
