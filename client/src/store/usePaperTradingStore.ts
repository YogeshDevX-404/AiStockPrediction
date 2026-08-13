import { create } from 'zustand';
import { VirtualAccountSummary, PaperApi } from '@/services/api/paperApi';

interface PaperTradingState {
  account: VirtualAccountSummary;
  isLoading: boolean;
  fetchAccount: () => Promise<void>;
}

export const usePaperTradingStore = create<PaperTradingState>((set) => ({
  account: {
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
  },
  isLoading: false,

  fetchAccount: async () => {
    try {
      set({ isLoading: true });
      const account = await PaperApi.getAccount();
      set({ account, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
