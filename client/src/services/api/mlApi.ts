import { apiClient } from '@/api';

export interface RegisteredModelItem {
  id: string;
  name: string;
  modelType: 'LSTM' | 'TRANSFORMER' | 'TFT' | 'XGBOOST' | 'CATBOOST' | 'PROPHET';
  version: string;
  status: 'CHAMPION' | 'CHALLENGER' | 'ARCHIVED';
  accuracy: number;
  rmse: number;
  mae: number;
  f1Score: number;
}

export interface TrainingRunOutput {
  runId: string;
  modelId: string;
  datasetVersion: string;
  epochs: number;
  loss: number;
  durationSeconds: number;
  status: 'COMPLETED' | 'RUNNING' | 'FAILED';
}

export interface ProbabilisticForecastOutput {
  symbol: string;
  timeframe: string;
  predictedDirection: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  expectedReturn: number;
  lowerBound95: number;
  upperBound95: number;
  confidenceScore: number;
  horizon: string;
}

export interface SHAPFeatureImportance {
  feature: string;
  importanceScore: number;
  impactDirection: 'POSITIVE' | 'NEGATIVE';
}

export interface ModelDriftMetrics {
  featureDriftScore: number;
  predictionDriftScore: number;
  accuracyDriftPercent: number;
  averageLatencyMs: number;
  totalInferenceRequests: number;
}

export const MLApi = {
  getModels: async (): Promise<RegisteredModelItem[]> => {
    const response: any = await apiClient.get('/ml/models');
    return response.data;
  },

  getModelById: async (id: string): Promise<RegisteredModelItem> => {
    const response: any = await apiClient.get(`/ml/models/${id}`);
    return response.data;
  },

  trainModel: async (modelId: string, datasetVersion: string): Promise<TrainingRunOutput> => {
    const response: any = await apiClient.post('/ml/train', { modelId, datasetVersion });
    return response.data;
  },

  predict: async (symbol: string, timeframe: string): Promise<{ forecast: ProbabilisticForecastOutput; shap: SHAPFeatureImportance[] }> => {
    const response: any = await apiClient.post('/ml/predict', { symbol, timeframe });
    return response.data;
  },

  getMetrics: async (): Promise<ModelDriftMetrics> => {
    const response: any = await apiClient.get('/ml/metrics');
    return response.data;
  },
};
