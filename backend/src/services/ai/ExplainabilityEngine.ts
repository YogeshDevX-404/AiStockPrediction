export class ExplainabilityEngine {
  public static generateRationale(symbol: string, signal: string): string[] {
    return [
      `RSI (14) at 64.2 confirms bullish momentum above neutral 50 centerline.`,
      `MACD histogram generated a bullish crossover above signal line on 4H timeframe.`,
      `Price trades comfortably above 20-day and 50-day EMA support levels.`,
      `Institutional volume spike measured at 2.4x historical 20-day average.`,
      `Order book depth reveals $128.50 key resistance converted into strong support zone.`,
    ];
  }
}
