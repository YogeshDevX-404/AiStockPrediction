import { prisma } from '../database';
import { MarketProviderFactory } from '../providers/MarketProviderFactory';
import { logger } from '../utils/logger';

export interface SmartWatchlistItem {
  id: string;
  watchlistId: string;
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  sparkline: number[];
  marketStatus: 'OPEN' | 'CLOSED';
  signal: 'BUY' | 'ACCUMULATE' | 'HOLD' | 'SELL';
  confidence: number;
  rsi: number;
  macdStatus: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'NEUTRAL';
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  riskScore: number;
  hasActiveAlert: boolean;
  addedAt: string;
}

export interface WatchlistGroup {
  id: string;
  name: string;
  isPinned: boolean;
  isFavorite: boolean;
  isArchived: boolean;
  itemCount: number;
}

export interface AIWatchlistRadarData {
  bestBuyToday?: { symbol: string; confidence: number; upside: string };
  bestSellToday?: { symbol: symbol; confidence: number; downside: string };
  breakoutCandidate?: { symbol: string; resistance: string };
  oversoldStock?: { symbol: string; rsi: number };
  volumeSpikeStock?: { symbol: string; volumeMultiplier: string };
}

export const getWatchlistsService = async (userId: string): Promise<WatchlistGroup[]> => {
  try {
    const watchlists = await prisma.watchlist.findMany({
      where: { userId },
      include: { items: true },
    });

    if (!watchlists || watchlists.length === 0) {
      return [];
    }

    return watchlists.map((w) => ({
      id: w.id,
      name: w.name,
      isPinned: w.isPinned,
      isFavorite: w.isFavorite,
      isArchived: w.isArchived,
      itemCount: w.items.length,
    }));
  } catch (err: any) {
    logger.warn('[WatchlistService] DB query error:', err.message);
    return [];
  }
};

export const getWatchlistItemsService = async (watchlistId?: string): Promise<SmartWatchlistItem[]> => {
  if (!watchlistId) return [];

  try {
    const items = await prisma.watchlistItem.findMany({
      where: { watchlistId },
    });

    if (!items || items.length === 0) return [];

    const provider = MarketProviderFactory.getProvider();

    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        let price = 0;
        let change = 0;
        let changePercent = 0;
        let exchange = 'NASDAQ';

        try {
          const q = await provider.getQuote(item.symbol);
          price = q.price;
          change = q.change;
          changePercent = q.changePercent;
          exchange = q.exchange || 'NASDAQ';
        } catch {
          // Market quote unconfigured
        }

        return {
          id: item.id,
          watchlistId: item.watchlistId,
          symbol: item.symbol,
          name: item.name || item.symbol,
          exchange,
          price,
          change,
          changePercent,
          volume: 'N/A',
          sparkline: [],
          marketStatus: 'OPEN' as const,
          signal: 'HOLD' as const,
          confidence: 0,
          rsi: 50,
          macdStatus: 'NEUTRAL' as const,
          trend: 'NEUTRAL' as const,
          riskScore: 0,
          hasActiveAlert: false,
          addedAt: item.addedAt.toISOString().split('T')[0],
        };
      })
    );

    return enrichedItems;
  } catch (err: any) {
    logger.warn('[WatchlistService] DB items query error:', err.message);
    return [];
  }
};

export const createWatchlistService = async (userId: string, name: string): Promise<WatchlistGroup> => {
  const newWl = await prisma.watchlist.create({
    data: {
      userId,
      name,
      isPinned: false,
      isFavorite: false,
      isArchived: false,
    },
  });

  return {
    id: newWl.id,
    name: newWl.name,
    isPinned: newWl.isPinned,
    isFavorite: newWl.isFavorite,
    isArchived: newWl.isArchived,
    itemCount: 0,
  };
};

export const addWatchlistItemService = async (watchlistId: string, symbol: string): Promise<SmartWatchlistItem> => {
  const upperSymbol = symbol.toUpperCase();
  const provider = MarketProviderFactory.getProvider();
  let companyName = upperSymbol;
  let price = 0;
  let change = 0;
  let changePercent = 0;

  try {
    const q = await provider.getQuote(upperSymbol);
    companyName = q.name || upperSymbol;
    price = q.price;
    change = q.change;
    changePercent = q.changePercent;
  } catch {
    // Quote unconfigured
  }

  const newItem = await prisma.watchlistItem.create({
    data: {
      watchlistId,
      symbol: upperSymbol,
      name: companyName,
    },
  });

  return {
    id: newItem.id,
    watchlistId: newItem.watchlistId,
    symbol: newItem.symbol,
    name: newItem.name,
    exchange: 'NASDAQ',
    price,
    change,
    changePercent,
    volume: 'N/A',
    sparkline: [],
    marketStatus: 'OPEN',
    signal: 'HOLD',
    confidence: 0,
    rsi: 50,
    macdStatus: 'NEUTRAL',
    trend: 'NEUTRAL',
    riskScore: 0,
    hasActiveAlert: false,
    addedAt: newItem.addedAt.toISOString().split('T')[0],
  };
};

export const deleteWatchlistItemService = async (id: string): Promise<boolean> => {
  try {
    await prisma.watchlistItem.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
};

export const getAIWatchlistRadarService = async (): Promise<AIWatchlistRadarData> => {
  return {};
};
