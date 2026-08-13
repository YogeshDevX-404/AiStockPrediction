import { create } from 'zustand';
import { ScreenshotAnalysisResult, AnalysisApi } from '@/services/api/analysisApi';

interface ImageAnalysisState {
  currentAnalysis: ScreenshotAnalysisResult | null;
  uploadedImagePreview: string | null;
  isAnalyzing: boolean;
  setUploadedImagePreview: (url: string | null) => void;
  runAnalysis: (imageName: string, imageBase64: string) => Promise<ScreenshotAnalysisResult | null>;
  clearAnalysis: () => void;
}

export const useImageAnalysisStore = create<ImageAnalysisState>((set) => ({
  currentAnalysis: {
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
    detectedPatterns: ['Ascending Triangle Breakout', 'Bullish Engulfing Candle', 'Higher High Structure'],
    detectedIndicators: ['RSI (14) = 64.2', 'MACD Bullish Cross', 'EMA 20/50 Support', 'Volume Spike 2.4x'],
    rationale: [
      'OCR Engine detected NVDA symbol and 1D timeframe on TradingView layout.',
      'Candlestick pattern recognition identified a high-conviction Bullish Engulfing bar at the $128.50 support level.',
      'Technical indicator overlay confirms RSI at 64.2 above neutral 50 centerline with expanding volume bars.',
      'Target resistance level projected at $155.00 based on Fibonacci extension 1.618.',
    ],
    createdAt: new Date().toISOString(),
  },
  uploadedImagePreview: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
  isAnalyzing: false,

  setUploadedImagePreview: (uploadedImagePreview) => set({ uploadedImagePreview }),

  runAnalysis: async (imageName, imageBase64) => {
    try {
      set({ isAnalyzing: true, uploadedImagePreview: imageBase64 });
      const result = await AnalysisApi.analyzeImage(imageName, imageBase64);
      set({ currentAnalysis: result, isAnalyzing: false });
      return result;
    } catch {
      set({ isAnalyzing: false });
      return null;
    }
  },

  clearAnalysis: () => set({ currentAnalysis: null, uploadedImagePreview: null }),
}));
