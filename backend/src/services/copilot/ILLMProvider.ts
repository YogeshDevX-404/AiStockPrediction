export interface CopilotResponseOutput {
  summary: string;
  detailedExplanation: string;
  recommendation?: 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL';
  confidenceScore: number;
  riskFactors: string[];
  suggestedNextStep: string;
  referencedSymbols: string[];
}

export interface ILLMProvider {
  name: string;
  generateResponse(prompt: string, context?: any): Promise<CopilotResponseOutput>;
}
