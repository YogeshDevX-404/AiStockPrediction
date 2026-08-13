import { PatternConfidenceEngine } from './PatternConfidenceEngine';
import { PatternExplanationEngine } from './PatternExplanationEngine';

export interface DetectedPatternItem {
  id: string;
  symbol: string;
  patternName: string;
  category: 'REVERSAL' | 'CONTINUATION' | 'TRIANGLE' | 'CANDLESTICK';
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidenceScore: number;
  strength: 'HIGH' | 'MEDIUM' | 'LOW';
  timeframe: string;
  targetMovePercent: number;
  rationale: string[];
}

export class PatternDetectionEngine {
  public static detect(symbol: string): DetectedPatternItem[] {
    const sym = symbol.toUpperCase();
    return [
      {
        id: `pat1_${Date.now()}`,
        symbol: sym,
        patternName: 'Bull Flag Consolidation',
        category: 'CONTINUATION',
        direction: 'BULLISH',
        confidenceScore: 92.4,
        strength: 'HIGH',
        timeframe: '1D',
        targetMovePercent: 14.8,
        rationale: PatternExplanationEngine.generateExplanation('Bull Flag Consolidation', sym),
      },
      {
        id: `pat2_${Date.now()}`,
        symbol: sym,
        patternName: 'Bullish Engulfing Candle',
        category: 'CANDLESTICK',
        direction: 'BULLISH',
        confidenceScore: 88.6,
        strength: 'HIGH',
        timeframe: '1D',
        rationale: PatternExplanationEngine.generateExplanation('Bullish Engulfing Candle', sym),
        targetMovePercent: 8.2,
      },
      {
        id: `pat3_${Date.now()}`,
        symbol: sym,
        patternName: 'Ascending Triangle Breakout',
        category: 'TRIANGLE',
        direction: 'BULLISH',
        confidenceScore: 85.0,
        strength: 'MEDIUM',
        timeframe: '4H',
        rationale: PatternExplanationEngine.generateExplanation('Ascending Triangle Breakout', sym),
        targetMovePercent: 11.4,
      },
    ];
  }
}
