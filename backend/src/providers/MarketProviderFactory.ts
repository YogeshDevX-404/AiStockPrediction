import { IMarketDataProvider } from './IMarketDataProvider';
import { FinnhubProvider } from './FinnhubProvider';
import { TwelveDataProvider } from './TwelveDataProvider';
import { AlphaVantageProvider } from './AlphaVantageProvider';
import { MockMarketProvider } from './MockMarketProvider';
import { logger } from '../utils/logger';

export class MarketProviderFactory {
  private static instance: IMarketDataProvider;

  public static getProvider(): IMarketDataProvider {
    if (!this.instance) {
      const rawProvider = process.env.MARKET_DATA_PROVIDER || 'finnhub';
      const providerName = rawProvider.trim().toLowerCase();

      logger.info(`[MarketProviderFactory] MARKET_DATA_PROVIDER=${providerName}`);

      const finnhubKey = process.env.FINNHUB_API_KEY || process.env.MARKET_DATA_API_KEY;
      const alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY || process.env.ALPHAVANTAGE_API_KEY;
      const twelveDataKey = process.env.TWELVEDATA_API_KEY;

      if (providerName === 'alphavantage') {
        logger.info(`[MarketProviderFactory] ALPHA_VANTAGE_API_KEY configured=${!!alphaVantageKey}`);
        this.instance = new AlphaVantageProvider();
      } else if (providerName === 'twelvedata') {
        logger.info(`[MarketProviderFactory] TWELVEDATA_API_KEY configured=${!!twelveDataKey}`);
        this.instance = new TwelveDataProvider();
      } else if (providerName === 'mock') {
        logger.info(`[MarketProviderFactory] MockMarketProvider explicitly requested`);
        this.instance = new MockMarketProvider();
      } else {
        // Default to Finnhub Provider (handles 'finnhub', 'FINNHUB', 'Finnhub', or default)
        logger.info(`[MarketProviderFactory] FINNHUB_API_KEY configured=${!!finnhubKey}`);
        this.instance = new FinnhubProvider();
      }

      logger.info(`[MarketProviderFactory] Initialized active market data provider: ${this.instance.name}`);
    }

    return this.instance;
  }
}
