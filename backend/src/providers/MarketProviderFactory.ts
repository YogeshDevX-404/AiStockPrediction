import { IMarketDataProvider } from './IMarketDataProvider';
import { MockMarketProvider } from './MockMarketProvider';
import { FinnhubProvider } from './FinnhubProvider';
import { TwelveDataProvider } from './TwelveDataProvider';
import { AlphaVantageProvider } from './AlphaVantageProvider';
import { logger } from '../utils/logger';

export class MarketProviderFactory {
  private static instance: IMarketDataProvider;

  public static getProvider(): IMarketDataProvider {
    if (!this.instance) {
      const providerName = (process.env.MARKET_DATA_PROVIDER || 'mock').toLowerCase();

      switch (providerName) {
        case 'finnhub':
          this.instance = new FinnhubProvider();
          break;
        case 'twelvedata':
          this.instance = new TwelveDataProvider();
          break;
        case 'alphavantage':
          this.instance = new AlphaVantageProvider();
          break;
        case 'mock':
        default:
          this.instance = new MockMarketProvider();
          break;
      }

      logger.info(`[MarketProviderFactory] Initialized active provider: ${this.instance.name}`);
    }

    return this.instance;
  }
}
