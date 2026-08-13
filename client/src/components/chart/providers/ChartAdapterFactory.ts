import { IChartAdapter } from './IChartAdapter';
import { LightweightChartsAdapter } from './LightweightChartsAdapter';
import { TradingViewAdapter } from './TradingViewAdapter';

export class ChartAdapterFactory {
  private static activeAdapter: IChartAdapter | null = null;

  public static getAdapter(providerType: 'lightweight' | 'tradingview' = 'lightweight'): IChartAdapter {
    if (!this.activeAdapter || (providerType === 'tradingview' && this.activeAdapter.name !== 'TradingViewAdapter')) {
      if (providerType === 'tradingview') {
        this.activeAdapter = new TradingViewAdapter();
      } else {
        this.activeAdapter = new LightweightChartsAdapter();
      }
    }
    return this.activeAdapter;
  }
}
