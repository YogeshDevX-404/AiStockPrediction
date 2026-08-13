import { apiClient } from '@/api';

export interface PlanDefinition {
  id: string;
  name: 'FREE' | 'PRO' | 'ENTERPRISE';
  title: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
}

export interface UserSubscriptionDetails {
  planTier: 'FREE' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  providerName: string;
  entitlements: {
    aiPredictions: boolean;
    aiCopilot: boolean;
    screenshotAnalysis: boolean;
    patternRecognition: boolean;
    paperTrading: boolean;
    backtesting: boolean;
    mlPredictions: boolean;
    prioritySupport: boolean;
  };
}

export interface UsageMeterItem {
  metricKey: string;
  label: string;
  consumed: number;
  limit: number;
  percentage: number;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  amount: number;
  tax: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  createdAt: string;
  pdfUrl: string;
}

export interface CouponValidationResult {
  code: string;
  isValid: boolean;
  discountPercent: number;
  message: string;
}

export const BillingApi = {
  getPlans: async (): Promise<PlanDefinition[]> => {
    const response: any = await apiClient.get('/billing/plans');
    return response.data;
  },

  getSubscription: async (): Promise<{ subscription: UserSubscriptionDetails; usage: UsageMeterItem[] }> => {
    const response: any = await apiClient.get('/billing/subscription');
    return response.data;
  },

  upgradePlan: async (planTier: 'FREE' | 'PRO' | 'ENTERPRISE'): Promise<UserSubscriptionDetails> => {
    const response: any = await apiClient.post('/billing/subscription/upgrade', { planTier });
    return response.data;
  },

  getInvoices: async (): Promise<InvoiceItem[]> => {
    const response: any = await apiClient.get('/billing/invoices');
    return response.data;
  },

  validateCoupon: async (code: string): Promise<CouponValidationResult> => {
    const response: any = await apiClient.post('/billing/coupons/validate', { code });
    return response.data;
  },
};
