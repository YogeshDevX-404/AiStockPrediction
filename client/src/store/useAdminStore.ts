import { create } from 'zustand';
import { ProviderItem, AuditLogItem, FeatureFlagItem, AdminApi } from '@/services/api/adminApi';
import { toast } from 'react-hot-toast';

interface AdminStoreState {
  providers: ProviderItem[];
  logs: AuditLogItem[];
  flags: FeatureFlagItem[];
  isLoading: boolean;
  fetchAdminData: () => Promise<void>;
  toggleProvider: (id: string, isEnabled: boolean) => Promise<void>;
  toggleFlag: (id: string) => void;
}

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  providers: [
    { id: 'pvd-1', name: 'Alpha Vantage Realtime API', providerType: 'MARKET', isEnabled: true, priority: 1, status: 'HEALTHY' },
    { id: 'pvd-2', name: 'Yahoo Finance Service Engine', providerType: 'MARKET', isEnabled: true, priority: 2, status: 'HEALTHY' },
    { id: 'pvd-3', name: 'FinBERT NLP Sentiment Provider', providerType: 'NEWS', isEnabled: true, priority: 1, status: 'HEALTHY' },
    { id: 'pvd-4', name: 'OpenAI GPT-4o Vision Adapter', providerType: 'VISION', isEnabled: true, priority: 1, status: 'HEALTHY' },
  ],
  logs: [
    { id: 'log-1', userId: 'usr-1', userEmail: 'alex@tradegenius.ai', action: 'UPDATE_PROVIDER_STATUS', resource: 'Alpha Vantage API', ipAddress: '192.168.1.1', status: 'SUCCESS', timestamp: '2026-03-25T14:32:00Z' },
    { id: 'log-2', userId: 'usr-2', userEmail: 'sarah.chen@quantfund.io', action: 'SUSPEND_USER', resource: 'usr-3', ipAddress: '10.0.0.45', status: 'SUCCESS', timestamp: '2026-03-24T18:00:00Z' },
  ],
  flags: [
    { id: 'ff-1', key: 'ENABLE_VISION_AI', name: 'AI Vision Screenshot Analysis', description: 'Enable TradingView screenshot OCR & pattern detection engine.', isEnabled: true },
    { id: 'ff-2', key: 'ENABLE_CANDLESTICK_INTEL', name: 'Candlestick Pattern Intelligence', description: 'Enable multi-candle pattern confidence scoring.', isEnabled: true },
    { id: 'ff-3', key: 'ENABLE_BETA_QUANT_MODELS', name: 'Experimental Monte Carlo Engine', description: 'Enable 10K Monte Carlo simulation stress testing.', isEnabled: false },
  ],
  isLoading: false,

  fetchAdminData: async () => {
    try {
      set({ isLoading: true });
      const providers = await AdminApi.getProviders();
      const logs = await AdminApi.getAuditLogs();
      const flags = await AdminApi.getFeatureFlags();
      set({ providers, logs, flags, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  toggleProvider: async (id, isEnabled) => {
    try {
      await AdminApi.toggleProvider(id, isEnabled);
      set((state) => ({
        providers: state.providers.map((p) => (p.id === id ? { ...p, isEnabled } : p)),
      }));
      toast.success('Updated provider configuration.');
    } catch {
      toast.error('Failed to update provider.');
    }
  },

  toggleFlag: (id) => {
    set((state) => ({
      flags: state.flags.map((f) => (f.id === id ? { ...f, isEnabled: !f.isEnabled } : f)),
    }));
    toast.success('Updated feature flag configuration.');
  },
}));
