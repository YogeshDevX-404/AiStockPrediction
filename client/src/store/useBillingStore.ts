import { create } from 'zustand';
import { PlanDefinition, BillingApi } from '@/services/api/billingApi';

interface BillingStoreState {
  plans: PlanDefinition[];
  billingCycle: 'MONTHLY' | 'YEARLY';
  isLoading: boolean;
  setBillingCycle: (cycle: 'MONTHLY' | 'YEARLY') => void;
  fetchPlans: () => Promise<void>;
}

export const useBillingStore = create<BillingStoreState>((set) => ({
  plans: [
    {
      id: 'plan-free',
      name: 'FREE',
      title: 'Free Plan',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Basic dashboard, limited watchlists, and standard news intelligence.',
      features: [
        'Basic Market Dashboard',
        '1 Watchlist (up to 5 stocks)',
        '10 AI Copilot Queries / month',
        'Standard Delayed News',
      ],
    },
    {
      id: 'plan-pro',
      name: 'PRO',
      title: 'Pro Trader',
      priceMonthly: 49,
      priceYearly: 470,
      description: 'Unlimited AI predictions, paper trading, and strategy backtesting.',
      features: [
        'Unlimited Watchlists & Stocks',
        'Unlimited AI Predictions',
        'AI Vision Chart Screenshot Analysis',
        'Paper Trading Engine ($10k Fund)',
        'Strategy Backtesting Engine',
        'Priority AI Copilot Dispatch',
      ],
    },
    {
      id: 'plan-enterprise',
      name: 'ENTERPRISE',
      title: 'Enterprise Institution',
      priceMonthly: 199,
      priceYearly: 1900,
      description: 'Dedicated ML forecasting models, team seats, multi-broker gateway, and admin console.',
      features: [
        'Everything in Pro Plan',
        'Machine Learning MLOps Platform',
        'Multi-Broker API Gateway (Zerodha/Alpaca)',
        'Team Seats & RBAC Roles',
        'Dedicated Account Manager',
        '99.9% SLA & Custom API Webhooks',
      ],
    },
  ],
  billingCycle: 'MONTHLY',
  isLoading: false,

  setBillingCycle: (cycle) => set({ billingCycle: cycle }),

  fetchPlans: async () => {
    try {
      set({ isLoading: true });
      const plans = await BillingApi.getPlans();
      set({ plans, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
