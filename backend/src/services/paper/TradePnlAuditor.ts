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

export class TradePnlAuditor {
  public static getTradeHistory(): PaperTradeItem[] {
    return [
      { id: 'trd-1', symbol: 'NVDA', side: 'BUY', quantity: 20, entryPrice: 110.0, exitPrice: 135.5, realizedPnl: 510.0, pnlPercent: 23.18, aiAgreementScore: 92.5, timestamp: '2026-03-25T14:15:00Z' },
      { id: 'trd-2', symbol: 'TSLA', side: 'BUY', quantity: 15, entryPrice: 210.0, exitPrice: 248.6, realizedPnl: 579.0, pnlPercent: 18.38, aiAgreementScore: 88.0, timestamp: '2026-03-24T11:30:00Z' },
    ];
  }

  public static getLeaderboard(): PaperLeaderboardItem[] {
    return [
      { rank: 1, username: 'QuantMaster99', returnPercent: 42.8, winRate: 91.2, totalTrades: 45 },
      { rank: 2, username: 'AlexRivera_AI', returnPercent: 38.5, winRate: 88.0, totalTrades: 32 },
      { rank: 3, username: 'TradeWizard', returnPercent: 31.2, winRate: 84.5, totalTrades: 28 },
    ];
  }

  public static getAchievements(): AchievementItem[] {
    return [
      { id: 'ach-1', key: 'FIRST_TRADE', title: 'First Virtual Trade', description: 'Placed your first paper trading order.', isUnlocked: true },
      { id: 'ach-2', key: 'WIN_STREAK_10', title: '10 Win Streak', description: 'Achieved 10 consecutive profitable paper trades.', isUnlocked: true },
      { id: 'ach-3', key: 'HIGH_CONVICTION', title: 'High AI Conviction', description: 'Executed 5 trades with >90% AI Conviction alignment.', isUnlocked: false },
    ];
  }
}
