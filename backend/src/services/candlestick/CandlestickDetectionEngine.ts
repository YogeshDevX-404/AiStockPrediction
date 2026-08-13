import { CandlestickExplanationEngine } from './CandlestickExplanationEngine';

export interface DetectedCandlestickItem {
  id: string;
  symbol: string;
  patternName: string;
  type: 'SINGLE' | 'MULTI';
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidenceScore: number;
  entryZone: string;
  targetPrice: number;
  stopLoss: number;
  rationale: string[];
}

export class CandlestickDetectionEngine {
  public static detect(symbol: string): DetectedCandlestickItem[] {
    const sym = symbol.toUpperCase();
    return [
      {
        id: `cd1_${Date.now()}`,
        symbol: sym,
        patternName: 'Bullish Engulfing',
        type: 'MULTI',
        bias: 'BULLISH',
        confidenceScore: 92.5,
        entryZone: '$130.00 - $132.50',
        targetPrice: 155.00,
        stopLoss: 124.00,
        rationale: CandlestickExplanationEngine.generateExplanation('Bullish Engulfing', sym),
      },
      {
        id: `cd2_${Date.now()}`,
        symbol: sym,
        patternName: 'Hammer Reversal',
        type: 'SINGLE',
        bias: 'BULLISH',
        confidenceScore: 88.0,
        entryZone: '$129.50 - $131.00',
        targetPrice: 148.00,
        stopLoss: 125.00,
        rationale: CandlestickExplanationEngine.generateExplanation('Hammer Reversal', sym),
      },
      {
        id: `cd3_${Date.now()}`,
        symbol: sym,
        patternName: 'Morning Star',
        type: 'MULTI',
        bias: 'BULLISH',
        confidenceScore: 90.0,
        entryZone: '$131.00 - $133.00',
        targetPrice: 158.00,
        stopLoss: 126.00,
        rationale: CandlestickExplanationEngine.generateExplanation('Morning Star', sym),
      },
    ];
  }
}
