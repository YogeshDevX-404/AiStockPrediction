export interface StrategyRuleItem {
  id: string;
  indicator: 'RSI' | 'EMA' | 'MACD' | 'VOLUME' | 'PATTERN' | 'SENTIMENT';
  operator: 'LESS_THAN' | 'GREATER_THAN' | 'CROSSES_ABOVE' | 'CROSSES_BELOW' | 'EQUALS';
  targetValue: string;
  ruleType: 'ENTRY' | 'EXIT' | 'RISK';
}

export interface StrategyDefinition {
  id: string;
  name: string;
  description: string;
  symbol: string;
  timeframe: string;
  rules: StrategyRuleItem[];
  winRate: number;
  netProfitPercent: number;
  sharpeRatio: number;
}

export class StrategyRuleEngine {
  public static getStrategies(): StrategyDefinition[] {
    return [
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
    ];
  }

  public static async createStrategy(strategyInput: any): Promise<StrategyDefinition> {
    return {
      id: `strat-${Date.now()}`,
      name: strategyInput.name || 'Custom Algorithmic Strategy',
      description: strategyInput.description || 'User-defined quantitative strategy rules.',
      symbol: strategyInput.symbol || 'NVDA',
      timeframe: strategyInput.timeframe || '1D',
      rules: strategyInput.rules || [],
      winRate: 72.0,
      netProfitPercent: 32.5,
      sharpeRatio: 1.75,
    };
  }
}
