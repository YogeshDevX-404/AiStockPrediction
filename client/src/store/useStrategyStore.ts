import { create } from 'zustand';
import { StrategyDefinition, StrategyApi } from '@/services/api/strategyApi';
import { toast } from 'react-hot-toast';

interface StrategyStoreState {
  strategies: StrategyDefinition[];
  isLoading: boolean;
  fetchStrategies: () => Promise<void>;
  createStrategy: (strategy: any) => Promise<void>;
}

export const useStrategyStore = create<StrategyStoreState>((set, get) => ({
  strategies: [
    {
      id: 'strat-1',
      name: 'RSI Oversold + EMA Golden Cross',
      description: 'Enters LONG when RSI < 30 and EMA 20 crosses above EMA 50 on 1D chart.',
      symbol: 'NVDA',
      timeframe: '1D',
      rules: [
        { id: 'r1', indicator: 'RSI', operator: 'LESS_THAN', targetValue: '30', ruleType: 'ENTRY' },
        { id: 'r2', indicator: 'EMA', operator: 'CROSSES_ABOVE', targetValue: 'EMA_50', ruleType: 'ENTRY' },
      ],
      winRate: 74.2,
      netProfitPercent: 38.5,
      sharpeRatio: 1.85,
    },
    {
      id: 'strat-2',
      name: 'MACD Bullish Breakout + Volume Spike',
      description: 'Enters LONG on MACD crossover with volume > 1.5x 20-day average.',
      symbol: 'TSLA',
      timeframe: '1D',
      rules: [
        { id: 'r3', indicator: 'MACD', operator: 'CROSSES_ABOVE', targetValue: 'SIGNAL', ruleType: 'ENTRY' },
        { id: 'r4', indicator: 'VOLUME', operator: 'GREATER_THAN', targetValue: '1.5x_AVG', ruleType: 'ENTRY' },
      ],
      winRate: 68.5,
      netProfitPercent: 29.4,
      sharpeRatio: 1.62,
    },
  ],
  isLoading: false,

  fetchStrategies: async () => {
    try {
      set({ isLoading: true });
      const strategies = await StrategyApi.getStrategies();
      set({ strategies, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createStrategy: async (strategyInput) => {
    try {
      set({ isLoading: true });
      const newStrategy = await StrategyApi.createStrategy(strategyInput);
      set((state) => ({ strategies: [...state.strategies, newStrategy], isLoading: false }));
      toast.success(`Created algorithmic strategy: ${newStrategy.name}!`);
    } catch {
      set({ isLoading: false });
      toast.error('Failed to create strategy.');
    }
  },
}));
