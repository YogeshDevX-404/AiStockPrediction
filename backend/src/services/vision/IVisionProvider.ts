export interface VisionAnalysisResult {
  ticker: string;
  timeframe: string;
  chartType: 'CANDLESTICK' | 'LINE' | 'AREA' | 'BAR' | 'HEIKIN_ASHI';
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  confidenceScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  entryZone: string;
  targetPrice: number;
  stopLoss: number;
  detectedPatterns: string[];
  detectedIndicators: string[];
  rationale: string[];
}

export interface IVisionProvider {
  name: string;
  analyzeImage(imageBase64OrUrl: string): Promise<VisionAnalysisResult>;
}
