export interface StrategyExecutiveReport {
  executiveSummary: string;
  strengths: string[];
  weaknesses: string[];
  overfittingRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendations: string[];
}

export class AIStrategyInsightEngine {
  public static generateExecutiveReport(): StrategyExecutiveReport {
    return {
      executiveSummary: 'Strategy displays robust risk-adjusted returns with a Profit Factor of 2.45 and low maximum drawdown (-12.4%).',
      strengths: [
        'High Win Rate (74.2%) across trending bull regimes.',
        'Effective RSI oversold filter prevents entering overextended moves.',
      ],
      weaknesses: [
        'Slight performance decay during sideways rangebound consolidation.',
      ],
      overfittingRisk: 'LOW',
      recommendations: [
        'Consider adding a Volatility ADX filter (>25) to avoid choppy sideways markets.',
        'Increase trailing stop to lock in profits on multi-day breakouts.',
      ],
    };
  }
}
