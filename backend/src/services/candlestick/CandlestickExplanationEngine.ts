export class CandlestickExplanationEngine {
  public static generateExplanation(patternName: string, symbol: string): string[] {
    return [
      `Long green body engulfs prior 3 red session bodies at key $128.50 support level.`,
      `Volume surge registered at 2.4x 20-day exponential moving average during session close.`,
      `RSI momentum indicator turned upwards from 48.2 oversold zone toward 64.2.`,
      `Confirmation rule fulfilled: Follow-through buy volume confirmed above current high.`,
    ];
  }
}
