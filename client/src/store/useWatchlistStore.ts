import { create } from 'zustand';
import { WatchlistGroup, SmartWatchlistItem, AIWatchlistRadar, WatchlistApi } from '@/services/api/watchlistApi';

interface WatchlistStoreState {
  watchlists: WatchlistGroup[];
  activeWatchlistId: string;
  items: SmartWatchlistItem[];
  radar: AIWatchlistRadar | null;
  isLoading: boolean;
  setActiveWatchlistId: (id: string) => void;
  fetchWatchlists: () => Promise<void>;
  fetchWatchlistItems: (id?: string) => Promise<void>;
  fetchRadar: () => Promise<void>;
  createWatchlist: (name: string) => Promise<void>;
  addItem: (symbol: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  togglePinWatchlist: (id: string) => void;
}

export const useWatchlistStore = create<WatchlistStoreState>((set, get) => ({
  watchlists: [
    { id: 'w1', name: 'My Watchlist', isPinned: true, isFavorite: true, isArchived: false, itemCount: 5 },
    { id: 'w2', name: 'US Stocks', isPinned: true, isFavorite: false, isArchived: false, itemCount: 4 },
    { id: 'w3', name: 'Indian Stocks', isPinned: false, isFavorite: true, isArchived: false, itemCount: 3 },
    { id: 'w4', name: 'Crypto', isPinned: false, isFavorite: false, isArchived: false, itemCount: 4 },
    { id: 'w5', name: 'High Conviction', isPinned: false, isFavorite: false, isArchived: false, itemCount: 3 },
    { id: 'w6', name: 'Long Term', isPinned: false, isFavorite: false, isArchived: false, itemCount: 4 },
    { id: 'w7', name: 'Intraday', isPinned: false, isFavorite: false, isArchived: false, itemCount: 2 },
  ],
  activeWatchlistId: 'w1',
  items: [
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
  ],
  radar: {
    bestBuyToday: { symbol: 'NVDA', confidence: 94.8, upside: '+17.0%' },
    bestSellToday: { symbol: 'INTC', confidence: 82.4, downside: '-8.5%' },
    breakoutCandidate: { symbol: 'TSLA', resistance: '$250.00' },
    oversoldStock: { symbol: 'GOOGL', rsi: 28.4 },
    volumeSpikeStock: { symbol: 'NVDA', volumeMultiplier: '2.8x Avg' },
  },
  isLoading: false,

  setActiveWatchlistId: (id) => {
    set({ activeWatchlistId: id });
    get().fetchWatchlistItems(id);
  },

  fetchWatchlists: async () => {
    try {
      set({ isLoading: true });
      const watchlists = await WatchlistApi.getWatchlists();
      set({ watchlists, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchWatchlistItems: async (id) => {
    try {
      set({ isLoading: true });
      const items = await WatchlistApi.getWatchlistItems(id || get().activeWatchlistId);
      set({ items, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchRadar: async () => {
    try {
      const radar = await WatchlistApi.getRadar();
      set({ radar });
    } catch (err) {
      // Fallback handled
    }
  },

  createWatchlist: async (name) => {
    try {
      set({ isLoading: true });
      const newWl = await WatchlistApi.createWatchlist(name);
      set((state) => ({
        watchlists: [...state.watchlists, newWl],
        activeWatchlistId: newWl.id,
        items: [],
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  addItem: async (symbol) => {
    try {
      set({ isLoading: true });
      const newItem = await WatchlistApi.addItem(get().activeWatchlistId, symbol);
      set((state) => ({ items: [...state.items, newItem], isLoading: false }));
    } catch {
      set({ isLoading: false });
    }
  },

  deleteItem: async (id) => {
    try {
      set({ isLoading: true });
      await WatchlistApi.deleteItem(id);
      set((state) => ({
        items: state.items.filter((i) => i.id !== id),
        isLoading: false,
      }));
    } catch {
      set({ isLoading: false });
    }
  },

  togglePinWatchlist: (id) => {
    set((state) => ({
      watchlists: state.watchlists.map((w) => (w.id === id ? { ...w, isPinned: !w.isPinned } : w)),
    }));
  },
}));
