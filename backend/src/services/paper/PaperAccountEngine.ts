import { prisma } from '../../database';
import { logger } from '../../utils/logger';

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
  public static async getAccountSummary(userId: string): Promise<VirtualAccountSummary> {
    try {
      let acc = await prisma.paperAccount.findUnique({
        where: { userId },
        include: { orders: true, trades: true, positions: true },
      });

      if (!acc) {
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
          throw new Error(`User with ID ${userId} does not exist in database`);
        }

        acc = await prisma.paperAccount.create({
          data: {
            userId,
            virtualCash: 10000.0,
            buyingPower: 10000.0,
            currency: 'USD',
            totalTrades: 0,
            winningTrades: 0,
          },
          include: { orders: true, trades: true, positions: true },
        });
      }

      const totalTrades = acc.totalTrades || acc.trades.length || 0;
      const winningTrades = acc.winningTrades || 0;
      const winRate = totalTrades > 0 ? parseFloat(((winningTrades / totalTrades) * 100).toFixed(2)) : 0;

      return {
        id: acc.id,
        virtualCash: acc.virtualCash,
        portfolioValue: acc.virtualCash,
        buyingPower: acc.buyingPower,
        todayPnl: 0,
        todayPnlPercent: 0,
        overallPnl: acc.virtualCash - 10000.0,
        overallPnlPercent: ((acc.virtualCash - 10000.0) / 10000.0) * 100,
        totalTrades,
        winningTrades,
        winRate,
      };
    } catch (err: any) {
      logger.warn('[PaperAccountEngine] DB query error:', err.message);
      return {
        id: `paper_${userId}`,
        virtualCash: 10000.0,
        portfolioValue: 10000.0,
        buyingPower: 10000.0,
        todayPnl: 0,
        todayPnlPercent: 0,
        overallPnl: 0,
        overallPnlPercent: 0,
        totalTrades: 0,
        winningTrades: 0,
        winRate: 0,
      };
    }
  }
}
