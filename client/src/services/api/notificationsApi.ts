import { apiClient } from '@/api';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'PRICE_ALERT' | 'TECHNICAL' | 'PATTERN' | 'AI_PREDICTION' | 'NEWS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isRead: boolean;
  symbol?: string;
  createdAt: string;
}

export interface NotificationPreference {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  webhookEnabled: boolean;
  webhookUrl?: string;
}

export const NotificationsApi = {
  getFeed: async (): Promise<AppNotification[]> => {
    const response: any = await apiClient.get('/notifications/feed');
    return response.data;
  },

  markAllRead: async (): Promise<boolean> => {
    const response: any = await apiClient.put('/notifications/read');
    return response.data.read;
  },

  deleteNotification: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/notifications/${id}`);
    return response.data.deleted;
  },

  getPreferences: async (): Promise<NotificationPreference> => {
    const response: any = await apiClient.get('/notifications/settings');
    return response.data;
  },

  updatePreferences: async (prefs: NotificationPreference): Promise<NotificationPreference> => {
    const response: any = await apiClient.post('/notifications/settings', prefs);
    return response.data;
  },
};
