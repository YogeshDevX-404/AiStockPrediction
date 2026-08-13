export interface MLCandlestickOutput {
  patternName: string;
  type: 'SINGLE' | 'MULTI';
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidenceScore: number;
  entryZone: string;
  targetPrice: number;
  stopLoss: number;
}

export interface IMLCandlestickAdapter {
  name: string;
  detectCandlesticks(symbol: string, timeframe: string): Promise<MLCandlestickOutput[]>;
}

export class MockPyTorchCandlestickAdapter implements IMLCandlestickAdapter {
  readonly name = 'PyTorchNeuralCandlestickAdapter';

  async detectCandlesticks(symbol: string, _timeframe: string): Promise<MLCandlestickOutput[]> {
    return [
      {
        patternName: 'Bullish Engulfing',
        type: 'MULTI',
        bias: 'BULLISH',
        confidenceScore: 92.5,
        entryZone: '$130.00 - $132.00',
        targetPrice: 152.00,
        stopLoss: 124.50,
      },
      {
        patternName: 'Hammer Reversal',
        type: 'SINGLE',
        bias: 'BULLISH',
        confidenceScore: 88.0,
        entryZone: '$129.50 - $131.00',
        targetPrice: 148.00,
        stopLoss: 125.00,
      },
    ];
  }
}
