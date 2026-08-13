import { create } from 'zustand';

interface SettingsState {
  currency: string;
  autoRefreshInterval: number; // in seconds
  soundEnabled: boolean;
  emailAlerts: boolean;
  pushNotifications: boolean;
  updateSettings: (partial: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  currency: 'USD',
  autoRefreshInterval: 5,
  soundEnabled: true,
  emailAlerts: true,
  pushNotifications: true,
  updateSettings: (partial) => set((state) => ({ ...state, ...partial })),
}));
