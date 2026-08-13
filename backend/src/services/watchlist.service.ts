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
  confidence: number; // 0 - 100
  rsi: number;
  macdStatus: 'BULLISH_CROSS' | 'BEARISH_CROSS' | 'NEUTRAL';
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  riskScore: number; // 0 - 10
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
  bestBuyToday: { symbol: string; confidence: number; upside: string };
  bestSellToday: { symbol: string; confidence: number; downside: string };
  breakoutCandidate: { symbol: string; resistance: string };
  oversoldStock: { symbol: string; rsi: number };
  volumeSpikeStock: { symbol: string; volumeMultiplier: string };
}

const mockWatchlists: WatchlistGroup[] = [
  { id: 'w1', name: 'My Watchlist', isPinned: true, isFavorite: true, isArchived: false, itemCount: 5 },
  { id: 'w2', name: 'US Stocks', isPinned: true, isFavorite: false, isArchived: false, itemCount: 4 },
  { id: 'w3', name: 'Indian Stocks', isPinned: false, isFavorite: true, isArchived: false, itemCount: 3 },
  { id: 'w4', name: 'Crypto', isPinned: false, isFavorite: false, isArchived: false, itemCount: 4 },
  { id: 'w5', name: 'High Conviction', isPinned: false, isFavorite: false, isArchived: false, itemCount: 3 },
  { id: 'w6', name: 'Long Term', isPinned: false, isFavorite: false, isArchived: false, itemCount: 4 },
  { id: 'w7', name: 'Intraday', isPinned: false, isFavorite: false, isArchived: false, itemCount: 2 },
];

const mockItems: SmartWatchlistItem[] = [
  {
    id: 'wi1',
    watchlistId: 'w1',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    price: 132.40,
    change: 4.42,
    changePercent: 3.45,
    volume: '48.2M',
    sparkline: [122, 124, 126, 125, 129, 132.4],
    marketStatus: 'OPEN',
    signal: 'BUY',
    confidence: 94.8,
    rsi: 64.2,
    macdStatus: 'BULLISH_CROSS',
    trend: 'BULLISH',
    riskScore: 2.1,
    hasActiveAlert: true,
    addedAt: '2026-03-10',
  },
  {
    id: 'wi2',
    watchlistId: 'w1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    price: 224.50,
    change: 4.05,
    changePercent: 1.84,
    volume: '38.4M',
    sparkline: [218, 220, 221, 222, 223, 224.5],
    marketStatus: 'OPEN',
    signal: 'ACCUMULATE',
    confidence: 88.5,
    rsi: 58.4,
    macdStatus: 'NEUTRAL',
    trend: 'BULLISH',
    riskScore: 1.8,
    hasActiveAlert: false,
    addedAt: '2026-03-12',
  },
  {
    id: 'wi3',
    watchlistId: 'w1',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    price: 248.60,
    change: 10.15,
    changePercent: 4.25,
    volume: '62.1M',
    sparkline: [235, 238, 240, 242, 246, 248.6],
    marketStatus: 'OPEN',
    signal: 'BUY',
    confidence: 91.2,
    rsi: 71.5,
    macdStatus: 'BULLISH_CROSS',
    trend: 'BULLISH',
    riskScore: 3.4,
    hasActiveAlert: true,
    addedAt: '2026-04-01',
  },
  {
    id: 'wi4',
    watchlistId: 'w1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    price: 3020.50,
    change: 28.50,
    changePercent: 0.95,
    volume: '8.4M',
    sparkline: [2980, 2990, 3000, 3010, 3015, 3020.5],
    marketStatus: 'OPEN',
    signal: 'HOLD',
    confidence: 76.0,
    rsi: 48.2,
    macdStatus: 'NEUTRAL',
    trend: 'NEUTRAL',
    riskScore: 1.9,
    hasActiveAlert: false,
    addedAt: '2026-02-20',
  },
  {
    id: 'wi5',
    watchlistId: 'w1',
    symbol: 'BTC/USD',
    name: 'Bitcoin Spot',
    exchange: 'CRYPTO',
    price: 67450.00,
    change: 2480.00,
    changePercent: 3.82,
    volume: '$28.4B',
    sparkline: [63000, 64200, 65100, 64800, 66300, 67450],
    marketStatus: 'OPEN',
    signal: 'BUY',
    confidence: 93.0,
    rsi: 68.0,
    macdStatus: 'BULLISH_CROSS',
    trend: 'BULLISH',
    riskScore: 4.2,
    hasActiveAlert: true,
    addedAt: '2026-01-15',
  },
];

export const getWatchlistsService = async (): Promise<WatchlistGroup[]> => {
  return mockWatchlists;
};

export const getWatchlistItemsService = async (watchlistId?: string): Promise<SmartWatchlistItem[]> => {
  if (!watchlistId) return mockItems;
  return mockItems.filter((i) => i.watchlistId === watchlistId);
};

export const createWatchlistService = async (name: string): Promise<WatchlistGroup> => {
  const newWl: WatchlistGroup = {
    id: `w_${Date.now()}`,
    name,
    isPinned: false,
    isFavorite: false,
    isArchived: false,
    itemCount: 0,
  };
  mockWatchlists.push(newWl);
  return newWl;
};

export const addWatchlistItemService = async (watchlistId: string, symbol: string): Promise<SmartWatchlistItem> => {
  const newItem: SmartWatchlistItem = {
    id: `wi_${Date.now()}`,
    watchlistId,
    symbol: symbol.toUpperCase(),
    name: `${symbol.toUpperCase()} Equity`,
    exchange: 'NASDAQ',
    price: 150.00,
    change: 2.50,
    changePercent: 1.69,
    volume: '15.2M',
    sparkline: [142, 144, 146, 148, 149, 150],
    marketStatus: 'OPEN',
    signal: 'BUY',
    confidence: 90.0,
    rsi: 55.0,
    macdStatus: 'BULLISH_CROSS',
    trend: 'BULLISH',
    riskScore: 2.0,
    hasActiveAlert: false,
    addedAt: new Date().toISOString().split('T')[0],
  };
  mockItems.push(newItem);
  return newItem;
};

export const deleteWatchlistItemService = async (id: string): Promise<boolean> => {
  const idx = mockItems.findIndex((i) => i.id === id);
  if (idx !== -1) {
    mockItems.splice(idx, 1);
    return true;
  }
  return false;
};

export const getAIWatchlistRadarService = async (): Promise<AIWatchlistRadarData> => {
  return {
    bestBuyToday: { symbol: 'NVDA', confidence: 94.8, upside: '+17.0%' },
    bestSellToday: { symbol: 'INTC', confidence: 82.4, downside: '-8.5%' },
    breakoutCandidate: { symbol: 'TSLA', resistance: '$250.00' },
    oversoldStock: { symbol: 'GOOGL', rsi: 28.4 },
    volumeSpikeStock: { symbol: 'NVDA', volumeMultiplier: '2.8x Avg' },
  };
};
