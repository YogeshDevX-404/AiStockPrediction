import { ILLMProvider, CopilotResponseOutput } from './ILLMProvider';

export class MockLLMProvider implements ILLMProvider {
  readonly name = 'TradeGeniusMockLLM';

  async generateResponse(prompt: string, context?: any): Promise<CopilotResponseOutput> {
    const lower = prompt.toLowerCase();

    if (lower.includes('portfolio')) {
      return {
        summary: 'Portfolio Audit: Excellent tech diversification with +19.8% all-time ROI.',
        detailedExplanation: 'Your portfolio currently holds $17,084.00 across 4 assets (NVDA, AAPL, TSLA, RELIANCE) with $10,000 in liquid cash. Diversification score is 88/100.',
        recommendation: 'BUY',
        confidenceScore: 92.0,
        riskFactors: [
          '42% sector concentration in Semiconductors (NVDA).',
          'Macro interest rate adjustments impacting tech P/E multiples.',
        ],
        suggestedNextStep: 'Consider deploying $3,000 cash balance into TSM to strengthen foundry moat.',
        referencedSymbols: ['NVDA', 'AAPL', 'TSLA', 'RELIANCE'],
      };
    }

    if (lower.includes('compare')) {
      return {
        summary: 'Stock Matrix Comparison: NVDA leads in revenue growth, AAPL leads in cash flow stability.',
        detailedExplanation: 'NVDA trades at 72.4 P/E with +17.0% target upside. AAPL trades at 34.2 P/E with +9.2% target upside.',
        recommendation: 'STRONG_BUY',
        confidenceScore: 94.5,
        riskFactors: [
          'High valuation multiples for NVDA require sustained AI GPU demand.',
        ],
        suggestedNextStep: 'Allocate 60% NVDA / 40% AAPL for optimal growth-defensive balance.',
        referencedSymbols: ['NVDA', 'AAPL'],
      };
    }

    return {
      summary: `Financial Analysis for Query: "${prompt}"`,
      detailedExplanation: `TradeGenius Copilot analyzed technical indicators, market depth, and news sentiment. Technical RSI stands at 64.2 with bullish EMA 20/50 support.`,
      recommendation: 'BUY',
      confidenceScore: 90.5,
      riskFactors: [
        'Short-term market volatility surrounding economic policy announcements.',
      ],
      suggestedNextStep: 'Set trailing stop loss at key support level $124.00.',
      referencedSymbols: ['NVDA'],
    };
  }
}
