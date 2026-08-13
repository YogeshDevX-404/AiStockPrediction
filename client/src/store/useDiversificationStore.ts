import { create } from 'zustand';
import { SectorExposureItem, PortfolioApi } from '@/services/api/portfolioApi';

interface DiversificationState {
  sectors: SectorExposureItem[];
  isLoading: boolean;
  fetchDiversification: () => Promise<void>;
}

export const useDiversificationStore = create<DiversificationState>((set) => ({
  sectors: [
    { sector: 'Technology', percentage: 42.0, value: 7175.28, color: '#10b981' },
    { sector: 'Semiconductors', percentage: 28.0, value: 4783.52, color: '#a855f7' },
    { sector: 'Automotive & EV', percentage: 18.0, value: 3075.12, color: '#3b82f6' },
    { sector: 'Cash Reserves', percentage: 12.0, value: 2050.08, color: '#f59e0b' },
  ],
  isLoading: false,

  fetchDiversification: async () => {
    try {
      set({ isLoading: true });
      const sectors = await PortfolioApi.getDiversification();
      set({ sectors, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
