import { create } from 'zustand';
import { CopilotMessage, CopilotApi } from '@/services/api/copilotApi';

interface CopilotStoreState {
  messages: CopilotMessage[];
  isThinking: boolean;
  activeProvider: string; // 'MockNeuralCopilot' | 'OpenAI' | 'Gemini' | 'Claude'
  setActiveProvider: (provider: string) => void;
  sendQuery: (prompt: string) => Promise<void>;
  fetchHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useCopilotStore = create<CopilotStoreState>((set, get) => ({
  messages: [
    {
      id: 'm1',
      role: 'assistant',
      summary: 'Hello! I am your AI Trading Copilot.',
      detailedExplanation: 'I can analyze your portfolio, review watchlists, explain technical chart patterns, evaluate risk metrics, and compare stock fundamentals in real-time. How can I assist your trading today?',
      confidenceScore: 100,
      riskFactors: [],
      suggestedNextStep: 'Try selecting a quick action prompt below or ask me to analyze NVDA or your portfolio.',
      referencedSymbols: [],
      timestamp: new Date().toISOString(),
    },
  ],
  isThinking: false,
  activeProvider: 'MockNeuralCopilot',

  setActiveProvider: (activeProvider) => set({ activeProvider }),

  sendQuery: async (prompt) => {
    const userMsg: CopilotMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      prompt,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isThinking: true,
    }));

    try {
      const assistantMsg = await CopilotApi.sendQuery(prompt);
      set((state) => ({
        messages: [...state.messages, assistantMsg],
        isThinking: false,
      }));
    } catch {
      set({ isThinking: false });
    }
  },

  fetchHistory: async () => {
    try {
      const history = await CopilotApi.getHistory();
      if (history.length > 0) set({ messages: history });
    } catch {
      // Keep default
    }
  },

  clearHistory: async () => {
    try {
      await CopilotApi.clearHistory();
      set({
        messages: [
          {
            id: `m_${Date.now()}`,
            role: 'assistant',
            summary: 'Chat history cleared.',
            detailedExplanation: 'Start a new conversation thread using quick prompts or typing a question.',
            confidenceScore: 100,
            timestamp: new Date().toISOString(),
          },
        ],
      });
    } catch {
      // Fallback
    }
  },
}));
