import { IVisionProvider, VisionAnalysisResult } from './IVisionProvider';

export class MockVisionAdapter implements IVisionProvider {
  readonly name = 'MockNeuralVisionAdapter';

  async analyzeImage(_imageBase64OrUrl: string): Promise<VisionAnalysisResult> {
    return {
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
    };
  }
}
