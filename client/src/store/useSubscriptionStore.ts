import { create } from 'zustand';
import { UserSubscriptionDetails, BillingApi } from '@/services/api/billingApi';
import { toast } from 'react-hot-toast';

interface SubscriptionStoreState {
  subscription: UserSubscriptionDetails;
  isLoading: boolean;
  isUpgrading: boolean;
  fetchSubscription: () => Promise<void>;
  upgradePlan: (planTier: 'FREE' | 'PRO' | 'ENTERPRISE') => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionStoreState>((set) => ({
  subscription: {
    planTier: 'PRO',
    status: 'ACTIVE',
    currentPeriodEnd: '2026-09-01T00:00:00Z',
    cancelAtPeriodEnd: false,
    providerName: 'Stripe',
    entitlements: {
      aiPredictions: true,
      aiCopilot: true,
      screenshotAnalysis: true,
      patternRecognition: true,
      paperTrading: true,
      backtesting: true,
      mlPredictions: true,
      prioritySupport: true,
    },
  },
  isLoading: false,
  isUpgrading: false,

  fetchSubscription: async () => {
    try {
      set({ isLoading: true });
      const data = await BillingApi.getSubscription();
      set({ subscription: data.subscription, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  upgradePlan: async (planTier) => {
    try {
      set({ isUpgrading: true });
      const updated = await BillingApi.upgradePlan(planTier);
      set({ subscription: updated, isUpgrading: false });
      toast.success(`Switched subscription plan to ${planTier}!`);
    } catch {
      set({ isUpgrading: false });
      toast.error('Plan upgrade failed.');
    }
  },
}));
