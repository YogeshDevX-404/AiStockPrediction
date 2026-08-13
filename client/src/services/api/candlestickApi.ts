import { apiClient } from '@/api';

export interface DetectedCandlestick {
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

export interface CandlestickHistoryItem {
  id: string;
  symbol: string;
  patternName: string;
  confidenceScore: number;
  actualOutcome: 'SUCCESS' | 'FAILED' | 'PENDING';
  realizedPnlPercent: number;
  timestamp: string;
}

export interface CandlestickStatisticItem {
  id: string;
  patternName: string;
  historicalSuccessRate: number;
  avgMovePercent: number;
  occurrences: number;
}

export const CandlestickApi = {
  getCandlesticksForSymbol: async (symbol: string): Promise<DetectedCandlestick[]> => {
    const response: any = await apiClient.get(`/candlesticks/${symbol}`);
    return response.data;
  },

  analyzeCandlesticks: async (symbol: string): Promise<DetectedCandlestick[]> => {
    const response: any = await apiClient.post('/candlesticks/analyze', { symbol });
    return response.data;
  },

  getHistory: async (): Promise<CandlestickHistoryItem[]> => {
    const response: any = await apiClient.get('/candlesticks/history');
    return response.data;
  },

  getStatistics: async (): Promise<CandlestickStatisticItem[]> => {
    const response: any = await apiClient.get('/candlesticks/statistics');
    return response.data;
  },
};
