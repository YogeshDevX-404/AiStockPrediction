import { create } from 'zustand';
import { SavedScreenerPreset, ScannerHistoryItem, ScreenerApi } from '@/services/api/screenerApi';
import { toast } from 'react-hot-toast';

interface SavedState {
  presets: SavedScreenerPreset[];
  history: ScannerHistoryItem[];
  isLoading: boolean;
  fetchPresetsAndHistory: () => Promise<void>;
  savePreset: (name: string, description: string, filtersJson: string) => Promise<void>;
  deletePreset: (id: string) => Promise<void>;
}

export const useSavedScreenerStore = create<SavedState>((set, get) => ({
  presets: [
    { id: 'ss1', name: 'Golden Cross AI Momentum', description: 'EMA 50 > EMA 200 with RSI between 40 and 65.', filtersJson: '{"minRsi":40,"maxRsi":65,"goldenCrossOnly":true}', isPinned: true, createdAt: '2026-03-20' },
    { id: 'ss2', name: 'High Yield Tech Value', description: 'Low P/E tech stocks with P/E < 30.', filtersJson: '{"maxPe":30,"sector":"Technology"}', isPinned: false, createdAt: '2026-03-18' },
  ],
  history: [
    { id: 'sh1', scanType: 'Golden Cross Breakout', matchedCount: 8, timestamp: '2026-03-25T12:00:00Z' },
    { id: 'sh2', scanType: 'Oversold RSI Dip Buy', matchedCount: 4, timestamp: '2026-03-24T16:30:00Z' },
  ],
  isLoading: false,

  fetchPresetsAndHistory: async () => {
    try {
      set({ isLoading: true });
      const presets = await ScreenerApi.getSavedPresets();
      const history = await ScreenerApi.getHistory();
      set({ presets, history, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  savePreset: async (name, description, filtersJson) => {
    try {
      const newPreset = await ScreenerApi.savePreset(name, description, filtersJson);
      set((state) => ({ presets: [...state.presets, newPreset] }));
      toast.success('Saved screener preset!');
    } catch {
      toast.error('Failed to save screener preset.');
    }
  },

  deletePreset: async (id) => {
    try {
      await ScreenerApi.deletePreset(id);
      set((state) => ({ presets: state.presets.filter((p) => p.id !== id) }));
      toast.success('Deleted screener preset.');
    } catch {
      toast.error('Failed to delete preset.');
    }
  },
}));
