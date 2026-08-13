import { MockLLMProvider } from './copilot/MockLLMProvider';
import { CopilotResponseOutput } from './copilot/ILLMProvider';

export interface CopilotChatMessage extends CopilotResponseOutput {
  id: string;
  role: 'user' | 'assistant' | 'system';
  prompt?: string;
  timestamp: string;
}

const mockCopilotHistory: CopilotChatMessage[] = [
  {
    id: 'cm1',
    role: 'user',
    prompt: 'Should I buy Reliance?',
    summary: 'Query regarding RELIANCE equity.',
    detailedExplanation: '',
    confidenceScore: 0,
    riskFactors: [],
    suggestedNextStep: '',
    referencedSymbols: ['RELIANCE'],
    timestamp: '2026-03-25T10:00:00Z',
  },
  {
    id: 'cm2',
    role: 'assistant',
    summary: 'RELIANCE Analysis: ACCUMULATE recommendation with 76.0% confidence rating.',
    detailedExplanation: 'Reliance Industries Ltd trades at ₹3,020.50 (+0.95% today) with strong support at ₹2,850.00. Institutional volume is steady.',
    recommendation: 'BUY',
    confidenceScore: 76.0,
    riskFactors: ['Refining margin cyclical fluctuations.'],
    suggestedNextStep: 'Accumulate on dips near ₹2,950.00 support zone.',
    referencedSymbols: ['RELIANCE'],
    timestamp: '2026-03-25T10:00:02Z',
  },
];

export const processCopilotQueryService = async (prompt: string, context?: any): Promise<CopilotChatMessage> => {
  const llmProvider = new MockLLMProvider();
  const output = await llmProvider.generateResponse(prompt, context);

  const assistantMessage: CopilotChatMessage = {
    id: `cm_${Date.now()}`,
    role: 'assistant',
    prompt,
    ...output,
    timestamp: new Date().toISOString(),
  };

  mockCopilotHistory.push(assistantMessage);
  return assistantMessage;
};

export const getCopilotHistoryService = async (): Promise<CopilotChatMessage[]> => {
  return mockCopilotHistory;
};

export const clearCopilotHistoryService = async (): Promise<boolean> => {
  mockCopilotHistory.length = 0;
  return true;
};
