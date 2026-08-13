import { MockVisionAdapter } from './vision/MockVisionAdapter';
import { VisionAnalysisResult } from './vision/IVisionProvider';

export interface ScreenshotAnalysisRecord extends VisionAnalysisResult {
  id: string;
  imageName: string;
  imageUrl?: string;
  createdAt: string;
}

const mockAnalysisHistory: ScreenshotAnalysisRecord[] = [
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
      'Technical indicator overlay confirms RSI at 64.2 above neutral 50 centerline with expanding volume bars.',
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
];

export const analyzeScreenshotService = async (
  imageName: string,
  imageBase64OrUrl: string
): Promise<ScreenshotAnalysisRecord> => {
  const visionAdapter = new MockVisionAdapter();
  const visionResult = await visionAdapter.analyzeImage(imageBase64OrUrl);

  const newRecord: ScreenshotAnalysisRecord = {
    id: `sa_${Date.now()}`,
    imageName: imageName || 'chart_screenshot.png',
    imageUrl: imageBase64OrUrl.startsWith('data:') ? imageBase64OrUrl : undefined,
    ...visionResult,
    createdAt: new Date().toISOString(),
  };

  mockAnalysisHistory.unshift(newRecord);
  return newRecord;
};

export const getAnalysisHistoryService = async (): Promise<ScreenshotAnalysisRecord[]> => {
  return mockAnalysisHistory;
};

export const getAnalysisByIdService = async (id: string): Promise<ScreenshotAnalysisRecord | null> => {
  return mockAnalysisHistory.find((a) => a.id === id) || mockAnalysisHistory[0];
};

export const deleteAnalysisRecordService = async (id: string): Promise<boolean> => {
  const idx = mockAnalysisHistory.findIndex((a) => a.id === id);
  if (idx !== -1) {
    mockAnalysisHistory.splice(idx, 1);
    return true;
  }
  return false;
};
