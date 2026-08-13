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

export class PaperAccountEngine {
  public static async getAccountSummary(): Promise<VirtualAccountSummary> {
    return {
      id: 'paper-acc-1',
      virtualCash: 10000.0,
      portfolioValue: 16840.0,
      buyingPower: 10000.0,
      todayPnl: 342.5,
      todayPnlPercent: 2.08,
      overallPnl: 2840.0,
      overallPnlPercent: 20.28,
      totalTrades: 12,
      winningTrades: 10,
      winRate: 83.33,
    };
  }
}
