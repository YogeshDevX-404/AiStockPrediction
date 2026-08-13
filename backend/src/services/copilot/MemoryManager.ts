export interface UserCopilotMemory {
  userId: string;
  preferredTimeframe: string;
  preferredMarket: string;
  favoriteSymbols: string[];
  learningMode: boolean;
}

export class MemoryManager {
  public static async getUserMemory(_userId: string): Promise<UserCopilotMemory> {
    return {
      userId: _userId || 'usr-1',
      preferredTimeframe: '1D',
      preferredMarket: 'US_EQUITIES',
      favoriteSymbols: ['NVDA', 'TSLA', 'AAPL'],
      learningMode: true,
    };
  }
}
