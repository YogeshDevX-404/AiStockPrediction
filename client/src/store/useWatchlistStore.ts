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
  watchlists: [],
  activeWatchlistId: '',
  items: [],
  radar: null,
  isLoading: false,

  setActiveWatchlistId: (id) => {
    set({ activeWatchlistId: id });
    get().fetchWatchlistItems(id);
  },

  fetchWatchlists: async () => {
    try {
      set({ isLoading: true });
      const watchlists = await WatchlistApi.getWatchlists();
      const activeId = watchlists.length > 0 ? watchlists[0].id : '';
      set({ watchlists: watchlists || [], activeWatchlistId: activeId, isLoading: false });
      if (activeId) {
        get().fetchWatchlistItems(activeId);
      }
    } catch {
      set({ isLoading: false });
    }
  },

  fetchWatchlistItems: async (id) => {
    try {
      set({ isLoading: true });
      const targetId = id || get().activeWatchlistId;
      if (!targetId) {
        set({ items: [], isLoading: false });
        return;
      }
      const items = await WatchlistApi.getWatchlistItems(targetId);
      set({ items: items || [], isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchRadar: async () => {
    try {
      const radar = await WatchlistApi.getRadar();
      set({ radar });
    } catch {
      set({ radar: null });
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
