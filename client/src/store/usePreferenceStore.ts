import { create } from 'zustand';
import { NotificationPreference, NotificationsApi } from '@/services/api/notificationsApi';
import { toast } from 'react-hot-toast';

interface PreferenceState {
  preferences: NotificationPreference;
  isLoading: boolean;
  fetchPreferences: () => Promise<void>;
  updatePreferences: (prefs: Partial<NotificationPreference>) => Promise<void>;
}

export const usePreferenceStore = create<PreferenceState>((set, get) => ({
  preferences: {
    inAppEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    webhookEnabled: false,
    webhookUrl: '',
  },
  isLoading: false,

  fetchPreferences: async () => {
    try {
      set({ isLoading: true });
      const preferences = await NotificationsApi.getPreferences();
      set({ preferences, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  updatePreferences: async (newPrefs) => {
    const updated = { ...get().preferences, ...newPrefs };
    set({ preferences: updated });
    try {
      await NotificationsApi.updatePreferences(updated);
      toast.success('Updated notification delivery preferences!');
    } catch {
      toast.error('Failed to update preferences.');
    }
  },
}));
