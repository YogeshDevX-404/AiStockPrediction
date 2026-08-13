import { PatternDetectionEngine, DetectedPatternItem } from './pattern/PatternDetectionEngine';

export interface PatternHistoryRecord {
  id: string;
  symbol: string;
  patternName: string;
  confidenceScore: number;
  actualOutcome: 'SUCCESS' | 'FAILED' | 'PENDING';
  realizedPnlPercent: number;
  timestamp: string;
}

export interface PatternStatisticRecord {
  id: string;
  patternName: string;
  category: string;
  historicalSuccessRate: number;
  avgMovePercent: number;
  occurrences: number;
}

export const getPatternsForSymbolService = async (symbol: string): Promise<DetectedPatternItem[]> => {
  return PatternDetectionEngine.detect(symbol);
};

export const runPatternScanService = async (symbol: string): Promise<DetectedPatternItem[]> => {
  return PatternDetectionEngine.detect(symbol || 'NVDA');
};

export const getPatternHistoryService = async (): Promise<PatternHistoryRecord[]> => {
  return [
    { id: 'path1', symbol: 'NVDA', patternName: 'Bull Flag Consolidation', confidenceScore: 92.4, actualOutcome: 'SUCCESS', realizedPnlPercent: 18.2, timestamp: '2026-03-22' },
    { id: 'path2', symbol: 'TSLA', patternName: 'Cup & Handle', confidenceScore: 94.0, actualOutcome: 'SUCCESS', realizedPnlPercent: 15.6, timestamp: '2026-03-18' },
    { id: 'path3', symbol: 'AAPL', patternName: 'Ascending Triangle', confidenceScore: 88.5, actualOutcome: 'SUCCESS', realizedPnlPercent: 11.4, timestamp: '2026-03-10' },
  ];
};

export const getPatternStatisticsService = async (): Promise<PatternStatisticRecord[]> => {
  return [
    { id: 'stat1', patternName: 'Bull Flag Consolidation', category: 'CONTINUATION', historicalSuccessRate: 84.5, avgMovePercent: 14.8, occurrences: 450 },
    { id: 'stat2', patternName: 'Cup & Handle', category: 'CONTINUATION', historicalSuccessRate: 88.2, avgMovePercent: 18.4, occurrences: 320 },
    { id: 'stat3', patternName: 'Inverse Head & Shoulders', category: 'REVERSAL', historicalSuccessRate: 82.0, avgMovePercent: 16.5, occurrences: 280 },
    { id: 'stat4', patternName: 'Bullish Engulfing Candle', category: 'CANDLESTICK', historicalSuccessRate: 79.4, avgMovePercent: 8.2, occurrences: 890 },
  ];
};
