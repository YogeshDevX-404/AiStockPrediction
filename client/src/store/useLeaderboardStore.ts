import { create } from 'zustand';
import { PaperLeaderboardItem, AchievementItem, PaperApi } from '@/services/api/paperApi';

interface LeaderboardStoreState {
  leaderboard: PaperLeaderboardItem[];
  achievements: AchievementItem[];
  isLoading: boolean;
  fetchLeaderboardAndAchievements: () => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardStoreState>((set) => ({
  leaderboard: [
    { rank: 1, username: 'QuantMaster99', returnPercent: 42.8, winRate: 91.2, totalTrades: 45 },
    { rank: 2, username: 'AlexRivera_AI', returnPercent: 38.5, winRate: 88.0, totalTrades: 32 },
    { rank: 3, username: 'TradeWizard', returnPercent: 31.2, winRate: 84.5, totalTrades: 28 },
  ],
  achievements: [
    { id: 'ach-1', key: 'FIRST_TRADE', title: 'First Virtual Trade', description: 'Placed your first paper trading order.', isUnlocked: true },
    { id: 'ach-2', key: 'WIN_STREAK_10', title: '10 Win Streak', description: 'Achieved 10 consecutive profitable paper trades.', isUnlocked: true },
    { id: 'ach-3', key: 'HIGH_CONVICTION', title: 'High AI Conviction', description: 'Executed 5 trades with >90% AI Conviction alignment.', isUnlocked: false },
  ],
  isLoading: false,

  fetchLeaderboardAndAchievements: async () => {
    try {
      set({ isLoading: true });
      const data = await PaperApi.getLeaderboard();
      set({ leaderboard: data.leaderboard, achievements: data.achievements, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
