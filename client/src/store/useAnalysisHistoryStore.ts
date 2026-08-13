import { create } from 'zustand';
import { ScreenshotAnalysisResult, AnalysisApi } from '@/services/api/analysisApi';

interface HistoryState {
  history: ScreenshotAnalysisResult[];
  isLoading: boolean;
  fetchHistory: () => Promise<void>;
  deleteHistoryRecord: (id: string) => Promise<void>;
}

export const useAnalysisHistoryStore = create<HistoryState>((set) => ({
  history: [
    {
      id: 'sa1',
      imageName: 'tradingview_nvda_breakout.png',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
      ticker: 'NVDA',
      timeframe: '1D',
      chartType: 'CANDLESTICK',
      signal: 'BUY',
      confidenceScore: 92.5,
      riskLevel: 'LOW',
      entryZone: '$130.00 - $132.50',
      targetPrice: 155.00,
      stopLoss: 124.00,
      detectedPatterns: ['Ascending Triangle Breakout', 'Bullish Engulfing Candle'],
      detectedIndicators: ['RSI (14) = 64.2', 'MACD Bullish Cross', 'Volume Spike 2.4x'],
      rationale: [
        'OCR Engine detected NVDA symbol and 1D timeframe on TradingView layout.',
        'Candlestick pattern recognition identified a high-conviction Bullish Engulfing bar at the $128.50 support level.',
      ],
      createdAt: '2026-03-25T14:30:00Z',
    },
    {
      id: 'sa2',
      imageName: 'zerodha_tsla_cup_handle.png',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
      ticker: 'TSLA',
      timeframe: '4H',
      chartType: 'CANDLESTICK',
      signal: 'STRONG_BUY',
      confidenceScore: 94.0,
      riskLevel: 'MEDIUM',
      entryZone: '$242.00 - $246.00',
      targetPrice: 280.00,
      stopLoss: 230.00,
      detectedPatterns: ['Cup & Handle Pattern', 'Bull Flag Consolidation'],
      detectedIndicators: ['RSI (14) = 68.5', 'VWAP Support'],
      rationale: [
        'GPT-4 Vision detected clear Cup & Handle consolidation on 4H chart.',
        'VWAP dynamic support line held during 3 consecutive test candle wicks.',
      ],
      createdAt: '2026-03-20T10:15:00Z',
    },
  ],
  isLoading: false,

  fetchHistory: async () => {
    try {
      set({ isLoading: true });
      const history = await AnalysisApi.getHistory();
      set({ history, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  deleteHistoryRecord: async (id) => {
    try {
      set({ isLoading: true });
      await AnalysisApi.deleteRecord(id);
      set((state) => ({
        history: state.history.filter((item) => item.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },
}));
