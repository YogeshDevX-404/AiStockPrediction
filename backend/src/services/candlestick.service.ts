import { CandlestickDetectionEngine, DetectedCandlestickItem } from './candlestick/CandlestickDetectionEngine';

export interface CandlestickHistoryRecord {
  id: string;
  symbol: string;
  patternName: string;
  confidenceScore: number;
  actualOutcome: 'SUCCESS' | 'FAILED' | 'PENDING';
  realizedPnlPercent: number;
  timestamp: string;
}

export interface CandlestickStatisticRecord {
  id: string;
  patternName: string;
  historicalSuccessRate: number;
  avgMovePercent: number;
  occurrences: number;
}

export const getCandlesticksForSymbolService = async (symbol: string): Promise<DetectedCandlestickItem[]> => {
  return CandlestickDetectionEngine.detect(symbol);
};

export const analyzeCandlestickService = async (symbol: string): Promise<DetectedCandlestickItem[]> => {
  return CandlestickDetectionEngine.detect(symbol || 'NVDA');
};

export const getCandlestickHistoryService = async (): Promise<CandlestickHistoryRecord[]> => {
  return [
    { id: 'cdh1', symbol: 'NVDA', patternName: 'Bullish Engulfing', confidenceScore: 92.5, actualOutcome: 'SUCCESS', realizedPnlPercent: 18.4, timestamp: '2026-03-24' },
    { id: 'cdh2', symbol: 'TSLA', patternName: 'Morning Star', confidenceScore: 90.0, actualOutcome: 'SUCCESS', realizedPnlPercent: 14.2, timestamp: '2026-03-19' },
    { id: 'cdh3', symbol: 'AAPL', patternName: 'Hammer Reversal', confidenceScore: 88.0, actualOutcome: 'SUCCESS', realizedPnlPercent: 9.8, timestamp: '2026-03-12' },
  ];
};

export const getCandlestickStatisticsService = async (): Promise<CandlestickStatisticRecord[]> => {
  return [
    { id: 'cdstat1', patternName: 'Bullish Engulfing', historicalSuccessRate: 82.4, avgMovePercent: 9.5, occurrences: 620 },
    { id: 'cdstat2', patternName: 'Morning Star', historicalSuccessRate: 85.0, avgMovePercent: 12.1, occurrences: 410 },
    { id: 'cdstat3', patternName: 'Hammer Reversal', historicalSuccessRate: 78.5, avgMovePercent: 8.4, occurrences: 790 },
    { id: 'cdstat4', patternName: 'Three White Soldiers', historicalSuccessRate: 89.2, avgMovePercent: 15.6, occurrences: 230 },
  ];
};
