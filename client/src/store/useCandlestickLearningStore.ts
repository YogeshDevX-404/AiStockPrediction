import { create } from 'zustand';

export interface EducationalPatternTopic {
  name: string;
  type: 'SINGLE' | 'MULTI';
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  meaning: string;
  typicalBehavior: string;
  confirmationRules: string[];
  commonMistakes: string[];
  riskWarnings: string;
}

interface LearningState {
  topics: EducationalPatternTopic[];
  selectedTopic: EducationalPatternTopic;
  setSelectedTopic: (topic: EducationalPatternTopic) => void;
}

const mockTopics: EducationalPatternTopic[] = [
  {
    name: 'Bullish Engulfing',
    type: 'MULTI',
    bias: 'BULLISH',
    meaning: 'A 2-candle bullish reversal pattern where a large green candle body completely engulfs the preceding red candle body.',
    typicalBehavior: 'Indicates a dramatic sentiment shift from bears to bulls during a downtrend or key support level.',
    confirmationRules: [
      'Preceding trend must be a clear downtrend or test of strong support.',
      'The second candle body must fully enclose the first candle body.',
      'Volume on the second bullish candle should exceed historical 20-day average.',
    ],
    commonMistakes: [
      'Buying in a sideways low-volatility market without a preceding downtrend.',
      'Ignoring overhead major resistance levels.',
    ],
    riskWarnings: 'Never place orders without a stop loss placed below the lowest wick of the engulfing pair.',
  },
  {
    name: 'Morning Star',
    type: 'MULTI',
    bias: 'BULLISH',
    meaning: 'A 3-candle bullish reversal pattern consisting of a long red candle, a small-bodied star (indecision), and a large green candle.',
    typicalBehavior: 'Signals exhaustion of selling momentum and early accumulation by institutional buyers.',
    confirmationRules: [
      'First candle is a strong bearish candle.',
      'Second candle gaps lower or has a small body/indecision Doji.',
      'Third candle closes deep into the body of the first bearish candle (> 50%).',
    ],
    commonMistakes: [
      'Entering before the third candle closes.',
      'Confusing with a continuation pause.',
    ],
    riskWarnings: 'High-volatility news events can invalidate morning star setups quickly.',
  },
];

export const useCandlestickLearningStore = create<LearningState>((set) => ({
  topics: mockTopics,
  selectedTopic: mockTopics[0],
  setSelectedTopic: (selectedTopic) => set({ selectedTopic }),
}));
