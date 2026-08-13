import { create } from 'zustand';
import { UsageMeterItem, BillingApi } from '@/services/api/billingApi';

interface UsageStoreState {
  usageMeters: UsageMeterItem[];
  isLoading: boolean;
  fetchUsage: () => Promise<void>;
}

export const useUsageStore = create<UsageStoreState>((set) => ({
  usageMeters: [
    { metricKey: 'AI_QUERIES', label: 'AI Copilot Queries', consumed: 142, limit: 500, percentage: 28.4 },
    { metricKey: 'PREDICTIONS', label: 'AI Market Predictions', consumed: 88, limit: 200, percentage: 44.0 },
    { metricKey: 'SCREENSHOTS', label: 'Vision Screenshot Analyses', consumed: 12, limit: 50, percentage: 24.0 },
  ],
  isLoading: false,

  fetchUsage: async () => {
    try {
      set({ isLoading: true });
      const data = await BillingApi.getSubscription();
      set({ usageMeters: data.usage, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
