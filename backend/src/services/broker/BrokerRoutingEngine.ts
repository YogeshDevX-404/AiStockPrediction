import { LinkedBrokerItem, BrokerOrderRequest } from './IBrokerAdapter';
import { ZerodhaKiteAdapter } from './ZerodhaKiteAdapter';
import { AlpacaAdapter } from './AlpacaAdapter';

export class BrokerRoutingEngine {
  private static zerodha = new ZerodhaKiteAdapter();
  private static alpaca = new AlpacaAdapter();

  public static async getAccounts(): Promise<LinkedBrokerItem[]> {
    const b1 = await this.zerodha.getAccountDetails();
    const b2 = await this.alpaca.getAccountDetails();
    return [b1, b2];
  }

  public static async routeOrder(request: BrokerOrderRequest): Promise<any> {
    if (request.brokerAccountId === 'brk-1') {
      return this.zerodha.placeOrder(request);
    }
    return this.alpaca.placeOrder(request);
  }
}
