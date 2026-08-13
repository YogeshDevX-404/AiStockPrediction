import { apiClient } from '@/api';

export interface ScreenshotAnalysisResult {
  id: string;
  imageName: string;
  imageUrl?: string;
  ticker: string;
  timeframe: string;
  chartType: string;
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  confidenceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  entryZone: string;
  targetPrice: number;
  stopLoss: number;
  detectedPatterns: string[];
  detectedIndicators: string[];
  rationale: string[];
  createdAt: string;
}

export const AnalysisApi = {
  analyzeImage: async (imageName: string, imageBase64: string): Promise<ScreenshotAnalysisResult> => {
    const response: any = await apiClient.post('/analysis/analyze', { imageName, image: imageBase64 });
    return response.data;
  },

  getHistory: async (): Promise<ScreenshotAnalysisResult[]> => {
    const response: any = await apiClient.get('/analysis/history');
    return response.data;
  },

  getById: async (id: string): Promise<ScreenshotAnalysisResult> => {
    const response: any = await apiClient.get(`/analysis/${id}`);
    return response.data;
  },

  deleteRecord: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/analysis/${id}`);
    return response.data.deleted;
  },
};
