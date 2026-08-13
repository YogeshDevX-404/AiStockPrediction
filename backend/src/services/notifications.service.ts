export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'PRICE_ALERT' | 'TECHNICAL' | 'PATTERN' | 'AI_PREDICTION' | 'NEWS';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isRead: boolean;
  symbol?: string;
  createdAt: string;
}

export interface NotificationPreferenceRecord {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  webhookEnabled: boolean;
  webhookUrl?: string;
}

const mockNotifications: NotificationItem[] = [
  { id: 'notif1', title: 'NVDA Target Reached', message: 'NVIDIA Corp crossed your $135.00 resistance price target.', type: 'PRICE_ALERT', priority: 'HIGH', isRead: false, symbol: 'NVDA', createdAt: '2026-03-25T14:15:00Z' },
  { id: 'notif2', title: 'Bull Flag Confirmed on TSLA', message: 'Pattern Recognition Engine detected Bull Flag Consolidation on 1D timeframe.', type: 'PATTERN', priority: 'HIGH', isRead: false, symbol: 'TSLA', createdAt: '2026-03-25T11:20:00Z' },
  { id: 'notif3', title: 'AI Prediction Shift', message: 'Confidence rating for RELIANCE increased from 82% to 88%.', type: 'AI_PREDICTION', priority: 'MEDIUM', isRead: true, symbol: 'RELIANCE', createdAt: '2026-03-24T09:00:00Z' },
];

let mockPreferences: NotificationPreferenceRecord = {
  inAppEnabled: true,
  emailEnabled: true,
  pushEnabled: true,
  webhookEnabled: false,
};

export const getNotificationsService = async (): Promise<NotificationItem[]> => {
  return mockNotifications;
};

export const markNotificationsReadService = async (): Promise<boolean> => {
  mockNotifications.forEach((n) => (n.isRead = true));
  return true;
};

export const deleteNotificationService = async (id: string): Promise<boolean> => {
  const idx = mockNotifications.findIndex((n) => n.id === id);
  if (idx !== -1) mockNotifications.splice(idx, 1);
  return true;
};

export const getNotificationPreferencesService = async (): Promise<NotificationPreferenceRecord> => {
  return mockPreferences;
};

export const updateNotificationPreferencesService = async (prefs: NotificationPreferenceRecord): Promise<NotificationPreferenceRecord> => {
  mockPreferences = { ...mockPreferences, ...prefs };
  return mockPreferences;
};
