import { apiClient } from '@/api';

export interface DetectedPattern {
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

export interface PatternHistoryItem {
  id: string;
  symbol: string;
  patternName: string;
  confidenceScore: number;
  actualOutcome: 'SUCCESS' | 'FAILED' | 'PENDING';
  realizedPnlPercent: number;
  timestamp: string;
}

export interface PatternStatisticItem {
  id: string;
  patternName: string;
  category: string;
  historicalSuccessRate: number;
  avgMovePercent: number;
  occurrences: number;
}

export const PatternApi = {
  getPatternsForSymbol: async (symbol: string): Promise<DetectedPattern[]> => {
    const response: any = await apiClient.get(`/patterns/${symbol}`);
    return response.data;
  },

  scanPatterns: async (symbol: string): Promise<DetectedPattern[]> => {
    const response: any = await apiClient.post('/patterns/detect', { symbol });
    return response.data;
  },

  getHistory: async (): Promise<PatternHistoryItem[]> => {
    const response: any = await apiClient.get('/patterns/history');
    return response.data;
  },

  getStatistics: async (): Promise<PatternStatisticItem[]> => {
    const response: any = await apiClient.get('/patterns/statistics');
    return response.data;
  },
};
