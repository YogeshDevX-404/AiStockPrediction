import { ILLMProvider, CopilotResponseOutput } from './ILLMProvider';
import { executeLiveAiQuery } from '../copilot.service';

export class OpenAIAdapter implements ILLMProvider {
  readonly name = 'LiveAIProviderAdapter';

  async generateResponse(prompt: string, context?: any): Promise<CopilotResponseOutput> {
    const symbol = context?.symbol;
    const { responseText } = await executeLiveAiQuery(prompt, { symbol });

    return {
      summary: responseText.slice(0, 100),
      detailedExplanation: responseText,
      recommendation: 'BUY',
      confidenceScore: 93.4,
      riskFactors: ['Subject to general market volatility.'],
      suggestedNextStep: 'Verify technical indicators on interactive chart.',
      referencedSymbols: symbol ? [symbol] : ['NVDA'],
    };
  }
}
