import { create } from 'zustand';
import { SystemHealthMetrics, AdminApi } from '@/services/api/adminApi';

interface SystemHealthState {
  health: SystemHealthMetrics;
  isLoading: boolean;
  fetchHealth: () => Promise<void>;
}

export const useSystemHealthStore = create<SystemHealthState>((set) => ({
  health: {
    cpuUsagePercent: 24.5,
    memoryUsagePercent: 42.8,
    dbStatus: 'HEALTHY',
    redisStatus: 'HEALTHY',
    apiStatus: 'ONLINE',
    uptimeSeconds: 1452800,
    activeWebsockets: 1420,
  },
  isLoading: false,

  fetchHealth: async () => {
    try {
      set({ isLoading: true });
      const health = await AdminApi.getSystemHealth();
      set({ health, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
