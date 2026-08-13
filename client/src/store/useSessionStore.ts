import { create } from 'zustand';

interface SessionState {
  lastActive: number;
  sessionTimeoutMinutes: number;
  isSessionExpired: boolean;
  updateLastActive: () => void;
  setSessionExpired: (expired: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  lastActive: Date.now(),
  sessionTimeoutMinutes: 60,
  isSessionExpired: false,
  updateLastActive: () => set({ lastActive: Date.now(), isSessionExpired: false }),
  setSessionExpired: (isSessionExpired) => set({ isSessionExpired }),
}));
