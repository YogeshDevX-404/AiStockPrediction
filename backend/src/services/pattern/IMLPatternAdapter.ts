export interface MLPatternResult {
  patternName: string;
  category: 'REVERSAL' | 'CONTINUATION' | 'TRIANGLE' | 'CANDLESTICK';
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidenceScore: number;
  strength: 'STRONG' | 'MODERATE' | 'WEAK';
  targetMovePercent: number;
}

export interface IMLPatternAdapter {
  name: string;
  detectPatterns(symbol: string, timeframe: string): Promise<MLPatternResult[]>;
}

export class MockTensorFlowPatternAdapter implements IMLPatternAdapter {
  readonly name = 'TensorFlowVisionPatternAdapter';

  async detectPatterns(symbol: string, _timeframe: string): Promise<MLPatternResult[]> {
    return [
      {
        patternName: 'Bull Flag Consolidation',
        category: 'CONTINUATION',
        direction: 'BULLISH',
        confidenceScore: 92.4,
        strength: 'STRONG',
        targetMovePercent: 14.8,
      },
      {
        patternName: 'Bullish Engulfing Candle',
        category: 'CANDLESTICK',
        direction: 'BULLISH',
        confidenceScore: 88.6,
        strength: 'STRONG',
        targetMovePercent: 8.2,
      },
    ];
  }
}
