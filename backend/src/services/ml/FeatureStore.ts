export interface FeatureVector {
  symbol: string;
  close: number;
  returns: number;
  rsi14: number;
  macd: number;
  volumeRatio: number;
  sentimentScore: number;
  patternSignal: number;
}

export class FeatureStore {
  public static async getFeatureVector(symbol: string): Promise<FeatureVector> {
    return {
      symbol: symbol.toUpperCase(),
      close: 135.50,
      returns: 2.45,
      rsi14: 64.2,
      macd: 1.85,
      volumeRatio: 1.42,
      sentimentScore: 0.88,
      patternSignal: 1,
    };
  }
}
