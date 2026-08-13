export type ThemeMode = 'dark' | 'light' | 'system';

export type UserRole = 'USER' | 'PREMIUM' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'UNVERIFIED';

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  country?: string;
  profileImage?: string;
  role: UserRole;
  status?: UserStatus;
  isVerified: boolean;
  googleId?: string | null;
  provider?: string;
  createdAt: string;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  exchange?: string;
  currency?: string;
  marketCap?: string;
  peRatio?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  sector?: string;
  industry?: string;
  avgVolume?: number;
  lastUpdated?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalProfit: number;
  totalProfitPercent: number;
  cashBalance: number;
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  profit: number;
  profitPercent: number;
}

export interface AIPrediction {
  id: string;
  symbol: string;
  name: string;
  targetPrice: number;
  confidenceScore: number; // 0 - 100
  signal: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  timeframe: '24H' | '7D' | '30D' | '90D';
  rationale: string[];
  updatedAt: string;
}

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  addedAt: string;
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  relatedSymbols: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}
