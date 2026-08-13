import { apiClient } from '@/api';

export interface AlertRule {
  id: string;
  symbol: string;
  alertType: 'PRICE_ABOVE' | 'PRICE_BELOW' | 'RSI_OVERSOLD' | 'GOLDEN_CROSS' | 'PREDICTION_SHIFT' | 'BREAKING_NEWS';
  targetValue: number;
  triggerCondition: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isEnabled: boolean;
  triggerCount: number;
  createdAt: string;
}

export interface AlertHistoryItem {
  id: string;
  symbol: string;
  alertType: string;
  triggerValue: string;
  timestamp: string;
  deliveryStatus: string;
}

export const AlertsApi = {
  getRules: async (): Promise<AlertRule[]> => {
    const response: any = await apiClient.get('/alerts');
    return response.data;
  },

  createRule: async (rule: any): Promise<AlertRule> => {
    const response: any = await apiClient.post('/alerts', rule);
    return response.data;
  },

  deleteRule: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/alerts/${id}`);
    return response.data.deleted;
  },

  getHistory: async (): Promise<AlertHistoryItem[]> => {
    const response: any = await apiClient.get('/alerts/history');
    return response.data;
  },
};
