import { MarketProviderFactory } from '../providers/MarketProviderFactory';

export interface KeyStatisticsData {
  marketCap: string;
  peRatio: number;
  eps: number;
  dividendYield: number;
  beta: number;
  roe: number;
  roce: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  bookValue: number;
  faceValue: number;
  enterpriseValue: string;
}

export interface FinancialsData {
  incomeStatement: { period: string; revenue: number; netIncome: number; ebitda: number; margin: number }[];
  balanceSheet: { period: string; assets: number; liabilities: number; equity: number }[];
  cashFlow: { period: string; operatingCashFlow: number; freeCashFlow: number }[];
  quarterlyResults: { quarter: string; revenue: number; profit: number; eps: number; margin: number; growth: number }[];
}

export interface CompanyProfileData {
  about: string;
  ceo: string;
  founded: string;
  employees: string;
  website: string;
  headquarters: string;
  sector: string;
  industry: string;
  shareholding: {
    promoters: number;
    fii: number;
    dii: number;
    retail: number;
    others: number;
  };
  dividendHistory: { exDate: string; recordDate: string; dividend: number; yield: number }[];
}

export interface AnalystRatingsData {
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
  consensusRating: string;
  targetPrice: number;
}

export const getDetailedStockService = async (symbol: string) => {
  const provider = MarketProviderFactory.getProvider();
  return provider.getQuote(symbol);
};

export const getStockStatisticsService = async (symbol: string): Promise<KeyStatisticsData> => {
  return {
    marketCap: '$3.25 Trillion',
    peRatio: 72.4,
    eps: 4.85,
    dividendYield: 0.12,
    beta: 1.68,
    roe: 48.5,
    roce: 42.1,
    fiftyTwoWeekHigh: 140.76,
    fiftyTwoWeekLow: 39.23,
    bookValue: 18.50,
    faceValue: 1.00,
    enterpriseValue: '$3.21 Trillion',
  };
};

export const getStockFinancialsService = async (symbol: string): Promise<FinancialsData> => {
  return {
    incomeStatement: [
      { period: '2023', revenue: 60922, netIncome: 29760, ebitda: 34200, margin: 48.8 },
      { period: '2024', revenue: 96310, netIncome: 53040, ebitda: 58900, margin: 55.0 },
      { period: '2025 (TTM)', revenue: 124500, netIncome: 68900, ebitda: 74200, margin: 55.3 },
    ],
    balanceSheet: [
      { period: '2023', assets: 65728, liabilities: 22745, equity: 42983 },
      { period: '2024', assets: 85200, liabilities: 26100, equity: 59100 },
      { period: '2025', assets: 112400, liabilities: 31200, equity: 81200 },
    ],
    cashFlow: [
      { period: '2023', operatingCashFlow: 28090, freeCashFlow: 26800 },
      { period: '2024', operatingCashFlow: 45200, freeCashFlow: 42100 },
      { period: '2025', operatingCashFlow: 58400, freeCashFlow: 54900 },
    ],
    quarterlyResults: [
      { quarter: 'Q1 2025', revenue: 26044, profit: 14881, eps: 0.60, margin: 57.1, growth: 262 },
      { quarter: 'Q2 2025', revenue: 30040, profit: 16599, eps: 0.68, margin: 55.2, growth: 122 },
      { quarter: 'Q3 2025', revenue: 35080, profit: 19300, eps: 0.78, margin: 55.0, growth: 94 },
      { quarter: 'Q4 2025', revenue: 39200, profit: 21400, eps: 0.86, margin: 54.5, growth: 78 },
    ],
  };
};

export const getStockProfileService = async (symbol: string): Promise<CompanyProfileData> => {
  return {
    about:
      'NVIDIA Corporation designs graphics processing units (GPUs) for the gaming, professional visualization, data center, and automotive markets. Its Blackwell GPU architecture powers global AI large language models and autonomous vehicles.',
    ceo: 'Jensen Huang',
    founded: '1993',
    employees: '29,600',
    website: 'https://www.nvidia.com',
    headquarters: 'Santa Clara, California, USA',
    sector: 'Technology',
    industry: 'Semiconductors',
    shareholding: {
      promoters: 48.5,
      fii: 24.2,
      dii: 14.8,
      retail: 8.5,
      others: 4.0,
    },
    dividendHistory: [
      { exDate: '2026-06-10', recordDate: '2026-06-11', dividend: 0.01, yield: 0.03 },
      { exDate: '2026-03-05', recordDate: '2026-03-06', dividend: 0.01, yield: 0.03 },
      { exDate: '2025-12-04', recordDate: '2025-12-05', dividend: 0.04, yield: 0.04 },
    ],
  };
};

export const getStockNewsService = async (symbol: string) => {
  return [
    {
      id: 'sn1',
      title: `${symbol}: Institutional Accumulation Spike Ahead of Earnings Call`,
      source: 'Bloomberg Technology',
      publishedAt: '30 mins ago',
      sentiment: 'BULLISH',
    },
    {
      id: 'sn2',
      title: `${symbol} Datacenter Revenue Reaches New All-Time Record`,
      source: 'Reuters Financial',
      publishedAt: '2 hours ago',
      sentiment: 'BULLISH',
    },
  ];
};

export const getStockAnalystRatingsService = async (symbol: string): Promise<AnalystRatingsData> => {
  return {
    strongBuy: 32,
    buy: 12,
    hold: 4,
    sell: 1,
    strongSell: 0,
    consensusRating: 'STRONG BUY',
    targetPrice: 155.00,
  };
};
