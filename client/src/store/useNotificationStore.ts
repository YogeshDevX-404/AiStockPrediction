import { create } from 'zustand';
import { AppNotification, NotificationsApi } from '@/services/api/notificationsApi';
import { toast } from 'react-hot-toast';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAllRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    { id: 'notif1', title: 'NVDA Target Reached', message: 'NVIDIA Corp crossed your $135.00 resistance price target.', type: 'PRICE_ALERT', priority: 'HIGH', isRead: false, symbol: 'NVDA', createdAt: '2026-03-25T14:15:00Z' },
    { id: 'notif2', title: 'Bull Flag Confirmed on TSLA', message: 'Pattern Recognition Engine detected Bull Flag Consolidation on 1D timeframe.', type: 'PATTERN', priority: 'HIGH', isRead: false, symbol: 'TSLA', createdAt: '2026-03-25T11:20:00Z' },
    { id: 'notif3', title: 'AI Prediction Shift', message: 'Confidence rating for RELIANCE increased from 82% to 88%.', type: 'AI_PREDICTION', priority: 'MEDIUM', isRead: true, symbol: 'RELIANCE', createdAt: '2026-03-24T09:00:00Z' },
  ],
  unreadCount: 2,
  isLoading: false,

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      const notifications = await NotificationsApi.getFeed();
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      set({ notifications, unreadCount, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  markAllRead: async () => {
    try {
      await NotificationsApi.markAllRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      }));
      toast.success('Marked all notifications as read.');
    } catch {
      toast.error('Failed to mark notifications read.');
    }
  },

  deleteNotification: async (id) => {
    try {
      await NotificationsApi.deleteNotification(id);
      set((state) => {
        const nextNotifs = state.notifications.filter((n) => n.id !== id);
        return {
          notifications: nextNotifs,
          unreadCount: nextNotifs.filter((n) => !n.isRead).length,
        };
      });
      toast.success('Deleted notification.');
    } catch {
      toast.error('Failed to delete notification.');
    }
  },
}));
