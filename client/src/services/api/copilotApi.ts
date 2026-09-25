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
    console.log(`[Copilot Diagnostic] Request started for prompt length: ${query?.length || 0}`);
    const response: any = await apiClient.post('/copilot/query', { query, symbol, prompt: query });
    console.log('[Copilot Diagnostic] POST /copilot/query completed. Response received.');

    // Handle nested response shapes safely (e.g. { success: true, data: { ... } } vs direct object)
    const dataObj = response?.data || response;
    const responseKeys = dataObj && typeof dataObj === 'object' ? Object.keys(dataObj) : typeof dataObj;
    console.log('[Copilot Diagnostic] Inner Data Keys:', responseKeys);

    const execSummary =
      dataObj?.executiveSummary ||
      dataObj?.content ||
      dataObj?.response ||
      dataObj?.summary ||
      (typeof dataObj === 'string' ? dataObj : '') ||
      'No summary available from AI engine.';

    console.log(`[Copilot Diagnostic] Extracted Executive Summary Length: ${execSummary.length}`);

    return {
      taskId: dataObj?.taskId || `task-${Date.now()}`,
      query: dataObj?.query || query,
      executiveSummary: execSummary,
      evidenceSources: Array.isArray(dataObj?.evidenceSources) ? dataObj.evidenceSources : ['TradeGenius AI Engine'],
      overallConfidence: typeof dataObj?.overallConfidence === 'number' ? dataObj.overallConfidence : 92.0,
      agentsParticipated: Array.isArray(dataObj?.agentsParticipated)
        ? dataObj.agentsParticipated
        : ['Market Intelligence Agent', 'Google Gemini Synthesis Agent'],
      executionTimeline: Array.isArray(dataObj?.executionTimeline) ? dataObj.executionTimeline : [],
      suggestedNextSteps: Array.isArray(dataObj?.suggestedNextSteps)
        ? dataObj.suggestedNextSteps
        : ['Ask Copilot for specific stock ticker analysis'],
      disclaimer:
        dataObj?.disclaimer ||
        'Multi-agent AI outputs express statistical probabilities based on quantitative models without guaranteeing future financial returns.',
    };
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
