export interface FinBERTSentimentOutput {
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  score: number;
  extractedEntities: string[];
  impactRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
}

export interface INLPNewsAdapter {
  name: string;
  analyzeArticleText(title: string, body: string): Promise<FinBERTSentimentOutput>;
}

export class MockFinBERTAdapter implements INLPNewsAdapter {
  readonly name = 'FinBERTTransformerAdapter';

  async analyzeArticleText(title: string, _body: string): Promise<FinBERTSentimentOutput> {
    return {
      sentiment: title.toLowerCase().includes('surge') ? 'BULLISH' : 'NEUTRAL',
      score: 92.0,
      extractedEntities: ['NVDA', 'TSM'],
      impactRating: 'HIGH',
    };
  }
}
