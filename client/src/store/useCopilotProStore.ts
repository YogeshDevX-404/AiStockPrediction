import { create } from 'zustand';
import { MultiAgentCopilotResponse, CopilotApi } from '@/services/api/copilotApi';
import { toast } from 'react-hot-toast';

interface CopilotProStoreState {
  currentResponse: MultiAgentCopilotResponse;
  isLoading: boolean;
  dispatchQuery: (query: string, symbol?: string) => Promise<void>;
}

export const useCopilotProStore = create<CopilotProStoreState>((set) => ({
  currentResponse: {
    taskId: 'task-101',
    query: 'Should I buy $NVDA?',
    executiveSummary: 'Synthesized multi-agent quantitative analysis for $NVDA. Market Research and Technical agents indicate strong bullish momentum (+25.8% expected target), supported by positive FinBERT news sentiment (88.5%). Risk Agent advises position sizing below 5% portfolio exposure.',
    evidenceSources: [
      'OHLC Market Data Feed (NASDAQ)',
      'FinBERT Financial Sentiment Engine',
      'Temporal Fusion Transformer ML Model (v3)',
      'Portfolio Risk Snapshot (Sharpe: 1.85)',
    ],
    overallConfidence: 91.5,
    agentsParticipated: [
      'Market Research Agent',
      'Technical Analysis Agent',
      'News Intelligence Agent',
      'Prediction Explanation Agent',
      'Risk Analysis Agent',
    ],
    executionTimeline: [
      { agentName: 'Market Research Agent', action: 'Extracted 1D OHLC sequence & Volume Ratio (1.8x avg)', confidence: 95.0, reasoning: 'Identified bullish breakout above 50-day EMA.' },
      { agentName: 'Technical Analysis Agent', action: 'Evaluated RSI(14) = 62.4 & MACD Bullish Cross', confidence: 92.0, reasoning: 'Indicators align with upside expansion.' },
      { agentName: 'News Intelligence Agent', action: 'Analyzed 14 recent SEC filings & news articles', confidence: 88.0, reasoning: 'Sentiment score 88.5% with high market impact.' },
      { agentName: 'Risk Analysis Agent', action: 'Calculated VaR 95% (-3.2%) and Max Drawdown (-12.4%)', confidence: 91.0, reasoning: 'Recommended maximum 5% position allocation.' },
    ],
    suggestedNextSteps: [
      'Set Stop-Loss alert at $128.50 on Alert Engine.',
      'Simulate paper trade execution ($10k virtual fund).',
      'Run historical strategy backtest on 1D timeframe.',
    ],
    disclaimer: 'Multi-agent AI outputs express statistical probabilities based on quantitative models without guaranteeing future financial returns.',
  },
  isLoading: false,

  dispatchQuery: async (query, symbol) => {
    try {
      set({ isLoading: true });
      const res = await CopilotApi.query(query, symbol);
      set({ currentResponse: res, isLoading: false });
      toast.success('Multi-agent orchestrator synthesis complete!');
    } catch {
      set({ isLoading: false });
      toast.error('Copilot Pro query failed.');
    }
  },
}));
