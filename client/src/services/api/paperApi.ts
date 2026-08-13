import { apiClient } from '@/api';

export interface VirtualAccountSummary {
  id: string;
  virtualCash: number;
  portfolioValue: number;
  buyingPower: number;
  todayPnl: number;
  todayPnlPercent: number;
  overallPnl: number;
  overallPnlPercent: number;
  totalTrades: number;
  winningTrades: number;
  winRate: number;
}

export interface PaperOrderItem {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP';
  quantity: number;
  price: number;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'REJECTED';
  createdAt: string;
}

export interface PaperTradeItem {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  realizedPnl: number;
  pnlPercent: number;
  aiAgreementScore: number;
  timestamp: string;
}

export interface PaperLeaderboardItem {
  rank: number;
  username: string;
  returnPercent: number;
  winRate: number;
  totalTrades: number;
}

export interface AchievementItem {
  id: string;
  key: string;
  title: string;
  description: string;
  isUnlocked: boolean;
}

export const PaperApi = {
  getAccount: async (): Promise<VirtualAccountSummary> => {
    const response: any = await apiClient.get('/paper/account');
    return response.data;
  },

  getOrders: async (): Promise<PaperOrderItem[]> => {
    const response: any = await apiClient.get('/paper/orders');
    return response.data;
  },

  submitOrder: async (order: any): Promise<PaperOrderItem> => {
    const response: any = await apiClient.post('/paper/orders', order);
    return response.data;
  },

  cancelOrder: async (id: string): Promise<boolean> => {
    const response: any = await apiClient.delete(`/paper/orders/${id}`);
    return response.data.cancelled;
  },

  getTrades: async (): Promise<PaperTradeItem[]> => {
    const response: any = await apiClient.get('/paper/trades');
    return response.data;
  },

  getLeaderboard: async (): Promise<{ leaderboard: PaperLeaderboardItem[]; achievements: AchievementItem[] }> => {
    const response: any = await apiClient.get('/paper/leaderboard');
    return response.data;
  },
};
