export interface ConfidenceScoreBreakdown {
  totalConfidence: number; // 0 - 100
  technicalWeight: number; // e.g. 35
  trendWeight: number;     // e.g. 25
  volumeWeight: number;    // e.g. 20
  volatilityWeight: number;// e.g. 20
}

export class ConfidenceEngine {
  public static calculateConfidence(symbol: string): ConfidenceScoreBreakdown {
    return {
      totalConfidence: 94.8,
      technicalWeight: 34.0,
      trendWeight: 24.5,
      volumeWeight: 19.8,
      volatilityWeight: 16.5,
    };
  }
}
