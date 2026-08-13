import { apiClient } from '@/api';

export interface AgentExecutionStep {
  agentName: string;
  action: string;
  confidence: number;
  reasoning: string;
}

export interface MultiAgentCopilotResponse {
  taskId: string;
  query: string;
  executiveSummary: string;
  evidenceSources: string[];
  overallConfidence: number;
  agentsParticipated: string[];
  executionTimeline: AgentExecutionStep[];
  suggestedNextSteps: string[];
  disclaimer: string;
}

export interface GeneratedReportItem {
  id: string;
  title: string;
  reportType: 'MORNING_BRIEF' | 'PORTFOLIO_HEALTH' | 'STOCK_ANALYSIS';
  createdAt: string;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  prompt?: string;
  summary?: string;
  detailedExplanation?: string;
  recommendation?: string;
  confidenceScore?: number;
  suggestedNextStep?: string;
  riskFactors?: string[];
  timestamp: string;
}

export const CopilotApi = {
  query: async (query: string, symbol?: string): Promise<MultiAgentCopilotResponse> => {
    const response: any = await apiClient.post('/copilot/query', { query, symbol });
    return response.data;
  },

  sendQuery: async (prompt: string, symbol?: string): Promise<CopilotMessage> => {
    const res = await CopilotApi.query(prompt, symbol);
    return {
      id: res.taskId,
      role: 'assistant',
      summary: 'Multi-Agent Synthesis',
      detailedExplanation: res.executiveSummary,
      confidenceScore: res.overallConfidence,
      suggestedNextStep: res.suggestedNextSteps[0],
      riskFactors: [res.disclaimer],
      timestamp: new Date().toISOString(),
    };
  },

  getHistory: async (): Promise<any[]> => {
    const response: any = await apiClient.get('/copilot/history');
    return response.data;
  },

  clearHistory: async (): Promise<boolean> => {
    return true;
  },

  getReports: async (): Promise<GeneratedReportItem[]> => {
    const response: any = await apiClient.get('/copilot/reports');
    return response.data;
  },

  getWorkspace: async (): Promise<any> => {
    const response: any = await apiClient.get('/copilot/workspace');
    return response.data;
  },
};
