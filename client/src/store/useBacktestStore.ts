import { create } from 'zustand';
import { BacktestRunOutput, StrategyApi } from '@/services/api/strategyApi';
import { toast } from 'react-hot-toast';

interface BacktestStoreState {
  currentRun: BacktestRunOutput;
  isRunning: boolean;
  runBacktest: (strategyId: string, capital: number) => Promise<void>;
}

export const useBacktestStore = create<BacktestStoreState>((set) => ({
  currentRun: {
    runId: 'btr-101',
    strategyId: 'strat-1',
    initialCapital: 10000.0,
    finalEquity: 13850.0,
    netProfit: 3850.0,
    netProfitPercent: 38.5,
    winRate: 74.2,
    profitFactor: 2.45,
    maxDrawdown: -12.4,
    sharpeRatio: 1.85,
    sortinoRatio: 2.40,
    totalTrades: 24,
    winningTrades: 18,
    trades: [
      { id: 'btr-t1', symbol: 'NVDA', side: 'BUY', entryDate: '2026-01-10', exitDate: '2026-01-25', entryPrice: 105.2, exitPrice: 132.4, pnl: 1360.0, pnlPercent: 25.85, reason: 'Take Profit Trigger' },
      { id: 'btr-t2', symbol: 'NVDA', side: 'BUY', entryDate: '2026-02-01', exitDate: '2026-02-14', entryPrice: 128.0, exitPrice: 142.5, pnl: 725.0, pnlPercent: 11.32, reason: 'RSI Exit Signal' },
    ],
    equityCurve: [
      { timestamp: '2026-01-01', equity: 10000.0, drawdownPercent: 0.0 },
      { timestamp: '2026-01-15', equity: 11360.0, drawdownPercent: 0.0 },
      { timestamp: '2026-02-01', equity: 10800.0, drawdownPercent: -4.9 },
      { timestamp: '2026-02-15', equity: 12400.0, drawdownPercent: 0.0 },
      { timestamp: '2026-03-01', equity: 13850.0, drawdownPercent: 0.0 },
    ],
  },
  isRunning: false,

  runBacktest: async (strategyId, capital) => {
    try {
      set({ isRunning: true });
      const run = await StrategyApi.runBacktest(strategyId, capital);
      set({ currentRun: run, isRunning: false });
      toast.success('Historical backtest simulation completed!');
    } catch {
      set({ isRunning: false });
      toast.error('Backtest simulation failed.');
    }
  },
}));
