import { apiClient } from '@/api';

export interface DetailedPrediction {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  confidenceScore: number;
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  timeframe: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskRewardRatio: number;
  rationale: string[];
  updatedAt: string;
}

export interface PredictionHistoryItem {
  id: string;
  predictionId: string;
  symbol: string;
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  confidenceScore: number;
  actualOutcome: 'WIN' | 'LOSS' | 'PENDING';
  pnlPercent: number;
  timestamp: string;
}

export interface ConfidenceBreakdown {
  totalConfidence: number;
  technicalWeight: number;
  trendWeight: number;
  volumeWeight: number;
  volatilityWeight: number;
}

export const PredictionApi = {
  getPrediction: async (symbol: string): Promise<DetailedPrediction> => {
    const response: any = await apiClient.get(`/predictions/${symbol}`);
    return response.data;
  },

  getHistory: async (): Promise<PredictionHistoryItem[]> => {
    const response: any = await apiClient.get('/predictions/history');
    return response.data;
  },

  analyze: async (symbol: string): Promise<DetailedPrediction> => {
    const response: any = await apiClient.post('/predictions/analyze', { symbol });
    return response.data;
  },

  getConfidenceBreakdown: async (symbol: string): Promise<ConfidenceBreakdown> => {
    const response: any = await apiClient.get(`/predictions/confidence/${symbol}`);
    return response.data;
  },
};
