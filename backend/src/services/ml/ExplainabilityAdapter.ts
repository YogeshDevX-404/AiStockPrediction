export interface SHAPFeatureImportance {
  feature: string;
  importanceScore: number;
  impactDirection: 'POSITIVE' | 'NEGATIVE';
}

export class ExplainabilityAdapter {
  public static getSHAPValues(): SHAPFeatureImportance[] {
    return [
      { feature: 'RSI(14) Momentum', importanceScore: 0.34, impactDirection: 'POSITIVE' },
      { feature: 'FinBERT Sentiment Score', importanceScore: 0.28, impactDirection: 'POSITIVE' },
      { feature: 'Volume Spike Ratio', importanceScore: 0.18, impactDirection: 'POSITIVE' },
      { feature: 'EMA(50) Trend Line', importanceScore: 0.12, impactDirection: 'POSITIVE' },
      { feature: 'Bollinger Band Width', importanceScore: 0.08, impactDirection: 'NEGATIVE' },
    ];
  }
}
