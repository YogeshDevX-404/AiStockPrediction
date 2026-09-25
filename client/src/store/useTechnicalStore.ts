import { create } from 'zustand';
import { MarketApi } from '@/services/api/marketApi';
import {
  calculateRSI,
  calculateMACD,
  calculateEMA,
  calculateSMA,
  calculateVWAP,
  calculateBollingerBands,
  calculateSupportResistance,
  determineOverallTrend,
} from '@/utils/technicalAnalysis';

export interface TechnicalIndicators {
  rsi: { value: number | null; signal: 'OVERBOUGHT' | 'OVERSOLD' | 'NEUTRAL' } | null;
  macd: { value: number | null; signalLine: number | null; histogram: number | null; signal: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'NEUTRAL' } | null;
  ema20: number | null;
  ema50: number | null;
  ema200: number | null;
  sma50: number | null;
  atr: number | null;
  adx: { value: number | null; trendStrength: string } | null;
  vwap: number | null;
  bollingerBands: { upper: number; middle: number; lower: number } | null;
  supportLevels: number[];
  resistanceLevels: number[];
  overallTrend: 'STRONG_BULLISH' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'STRONG_BEARISH';
}

interface TechnicalState {
  indicators: TechnicalIndicators | null;
  isLoading: boolean;
  fetchTechnicals: (symbol: string) => Promise<void>;
}

export const useTechnicalStore = create<TechnicalState>((set) => ({
  indicators: null,
  isLoading: false,

  fetchTechnicals: async (symbol: string) => {
    try {
      set({ isLoading: true });
      const history = await MarketApi.getHistoricalData(symbol, '1D');
      
      if (!history || history.length === 0) {
        set({ indicators: null, isLoading: false });
        return;
      }

      const closes = history.map(d => d.close);
      const latestClose = closes[closes.length - 1];

      const rsi = calculateRSI(closes, 14);
      const macd = calculateMACD(closes);
      const ema20 = calculateEMA(closes, 20);
      const ema50 = calculateEMA(closes, 50);
      const ema200 = calculateEMA(closes, 200);
      const sma50 = calculateSMA(closes, 50);
      const vwap = calculateVWAP(history);
      const bb = calculateBollingerBands(closes, 20, 2);
      const sr = calculateSupportResistance(history);
      
      const overallTrend = determineOverallTrend(latestClose, ema20, ema50, ema200);

      set({
        indicators: {
          rsi: rsi ? { value: rsi.value, signal: rsi.signal } : null,
          macd: macd ? { value: macd.value, signalLine: macd.signalLine, histogram: macd.histogram, signal: macd.signal } : null,
          ema20,
          ema50,
          ema200,
          sma50,
          atr: null, // Left null for now as not required
          adx: null, // Left null for now as not required
          vwap,
          bollingerBands: bb ? { upper: bb.upper, middle: bb.middle, lower: bb.lower } : null,
          supportLevels: sr.supportLevels,
          resistanceLevels: sr.resistanceLevels,
          overallTrend,
        },
        isLoading: false
      });
    } catch (error) {
      console.error("Error fetching technicals:", error);
      set({ indicators: null, isLoading: false });
    }
  },
}));
