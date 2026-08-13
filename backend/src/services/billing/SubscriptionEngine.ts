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

export class SubscriptionEngine {
  public static getPlans(): PlanDefinition[] {
    return [
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
    ];
  }

  public static async getUserSubscription(_userId: string): Promise<UserSubscriptionDetails> {
    return {
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
    };
  }

  public static async upgradePlan(_userId: string, newTier: 'FREE' | 'PRO' | 'ENTERPRISE'): Promise<UserSubscriptionDetails> {
    const sub = await this.getUserSubscription(_userId);
    return {
      ...sub,
      planTier: newTier,
      status: 'ACTIVE',
    };
  }
}
