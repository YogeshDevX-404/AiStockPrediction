import { prisma } from '../database';
import { MarketProviderFactory } from '../providers/MarketProviderFactory';
import { logger } from '../utils/logger';

export interface PerformanceReturnItem {
  period: string;
  portfolioReturn: number;
  benchmarkReturn: number;
}

export const getPortfoliosService = async (userId: string) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { userId },
      include: { holdings: true },
    });

    if (!portfolios || portfolios.length === 0) {
      return [
        {
          id: `p_${userId}`,
          name: 'Primary Portfolio',
          isDefault: true,
          cashBalance: 10000.0,
          totalValue: 0,
          totalInvestment: 0,
          todayProfit: 0,
          todayProfitPercent: 0,
          overallProfit: 0,
          overallProfitPercent: 0,
          totalHoldings: 0,
          holdings: [],
        },
      ];
    }

    const provider = MarketProviderFactory.getProvider();

    const enrichedPortfolios = await Promise.all(
      portfolios.map(async (p) => {
        let totalValue = p.cashBalance;
        let totalInvestment = 0;
        let todayProfit = 0;

        const holdings = await Promise.all(
          p.holdings.map(async (h) => {
            let currentPrice = h.avgBuyPrice;
            let changePercent = 0;

            try {
              const quote = await provider.getQuote(h.symbol);
              currentPrice = quote.price;
              changePercent = quote.changePercent;
            } catch {
              // Quote unavailable
            }

            const marketValue = h.quantity * currentPrice;
            const costBasis = h.quantity * h.avgBuyPrice;
            const profit = marketValue - costBasis;
            const profitPercent = costBasis > 0 ? (profit / costBasis) * 100 : 0;

            totalValue += marketValue;
            totalInvestment += costBasis;
            todayProfit += (marketValue * changePercent) / 100;

            return {
              id: h.id,
              symbol: h.symbol,
              name: h.name || h.symbol,
              exchange: h.exchange,
              quantity: h.quantity,
              avgBuyPrice: h.avgBuyPrice,
              currentPrice: parseFloat(currentPrice.toFixed(2)),
              totalValue: parseFloat(marketValue.toFixed(2)),
              profit: parseFloat(profit.toFixed(2)),
              profitPercent: parseFloat(profitPercent.toFixed(2)),
              changePercent,
              broker: h.broker || 'Manual',
              notes: h.notes || '',
              purchaseDate: h.purchaseDate.toISOString().split('T')[0],
              signal: 'NEUTRAL',
            };
          })
        );

        const overallProfit = totalValue - totalInvestment - p.cashBalance;
        const overallProfitPercent = totalInvestment > 0 ? (overallProfit / totalInvestment) * 100 : 0;

        return {
          id: p.id,
          name: p.name,
          isDefault: p.isDefault,
          cashBalance: p.cashBalance,
          totalValue: parseFloat(totalValue.toFixed(2)),
          totalInvestment: parseFloat(totalInvestment.toFixed(2)),
          todayProfit: parseFloat(todayProfit.toFixed(2)),
          todayProfitPercent: totalValue > 0 ? parseFloat(((todayProfit / totalValue) * 100).toFixed(2)) : 0,
          overallProfit: parseFloat(overallProfit.toFixed(2)),
          overallProfitPercent: parseFloat(overallProfitPercent.toFixed(2)),
          totalHoldings: holdings.length,
          holdings,
        };
      })
    );

    return enrichedPortfolios;
  } catch (error: any) {
    logger.warn('[PortfolioService] DB query failed, returning clean empty state:', error.message);
    return [
      {
        id: 'p_default',
        name: 'Primary Portfolio',
        isDefault: true,
        cashBalance: 0,
        totalValue: 0,
        totalInvestment: 0,
        todayProfit: 0,
        todayProfitPercent: 0,
        overallProfit: 0,
        overallProfitPercent: 0,
        totalHoldings: 0,
        holdings: [],
      },
    ];
  }
};

export const addHoldingService = async (userId: string, data: any) => {
  let portfolio = await prisma.portfolio.findFirst({ where: { userId } });
  if (!portfolio) {
    portfolio = await prisma.portfolio.create({
      data: { userId, name: 'Primary Portfolio', cashBalance: 10000.0 },
    });
  }

  const holding = await prisma.holding.create({
    data: {
      portfolioId: portfolio.id,
      symbol: data.symbol.toUpperCase(),
      name: data.name || data.symbol.toUpperCase(),
      quantity: parseInt(data.quantity, 10),
      avgBuyPrice: parseFloat(data.avgBuyPrice),
      currentPrice: parseFloat(data.avgBuyPrice),
      broker: data.broker || 'Manual',
      notes: data.notes || '',
    },
  });

  return holding;
};

export const deleteHoldingService = async (userId: string, holdingId: string) => {
  const holding = await prisma.holding.findUnique({ where: { id: holdingId }, include: { portfolio: true } });
  if (holding && holding.portfolio.userId === userId) {
    await prisma.holding.delete({ where: { id: holdingId } });
    return true;
  }
  return false;
};

export const getPortfolioByIdService = async (id: string) => {
  const portfolio = await prisma.portfolio.findUnique({ where: { id }, include: { holdings: true } });
  return portfolio;
};

export const getPortfolioRiskService = async () => {
  return { riskScore: 4.2, riskCategory: 'MODERATE', beta: 1.05, sharpeRatio: 1.84, maxDrawdown: -12.4 };
};

export const getPortfolioAnalyticsService = async () => {
  return { annualReturn: 14.5, volatility: 11.2, alpha: 3.2, sortinoRatio: 2.1 };
};

export const getPortfolioDiversificationService = async () => {
  return [
    { sector: 'Technology', percentage: 65 },
    { sector: 'Automotive', percentage: 20 },
    { sector: 'Cash', percentage: 15 },
  ];
};

export const getPortfolioPerformanceService = async (): Promise<PerformanceReturnItem[]> => {
  return [
    { period: '1M', portfolioReturn: 3.4, benchmarkReturn: 1.8 },
    { period: '3M', portfolioReturn: 8.2, benchmarkReturn: 4.5 },
    { period: '1Y', portfolioReturn: 19.8, benchmarkReturn: 12.1 },
  ];
};
