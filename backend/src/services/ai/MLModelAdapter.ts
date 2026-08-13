export interface MLPredictionOutput {
  symbol: string;
  predictedPrice: number;
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  modelConfidence: number; // 0 - 100
  featureImportances: { feature: string; weight: number }[];
}

export interface IMLModelAdapter {
  name: string;
  predict(symbol: string, timeframe: string): Promise<MLPredictionOutput>;
}

export class MockXGBoostAdapter implements IMLModelAdapter {
  readonly name = 'XGBoostGradientBoostAdapter';

  async predict(symbol: string, timeframe: string): Promise<MLPredictionOutput> {
    return {
      symbol: symbol.toUpperCase(),
      predictedPrice: 155.00,
      direction: 'BULLISH',
      modelConfidence: 94.8,
      featureImportances: [
        { feature: 'RSI_14', weight: 0.32 },
        { feature: 'MACD_CROSSOVER', weight: 0.28 },
        { feature: 'DARK_POOL_VOLUME', weight: 0.25 },
        { feature: 'EMA_20_DISTANCE', weight: 0.15 },
      ],
    };
  }
}
