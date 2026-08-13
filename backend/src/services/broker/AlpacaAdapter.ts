import { IBrokerAdapter, LinkedBrokerItem, BrokerOrderRequest } from './IBrokerAdapter';

export class AlpacaAdapter implements IBrokerAdapter {
  public async connect(_credentials: any): Promise<boolean> {
    return true;
  }

  public async getAccountDetails(): Promise<LinkedBrokerItem> {
    return {
      id: 'brk-2',
      brokerName: 'Alpaca Markets',
      accountName: 'Alpaca US Equity Account',
      accountNumber: 'ALP-90214',
      cashBalance: 15000.0,
      buyingPower: 60000.0,
      status: 'CONNECTED',
      lastSynced: new Date().toISOString(),
    };
  }

  public async placeOrder(request: BrokerOrderRequest): Promise<any> {
    return {
      orderId: `alpaca-${Date.now()}`,
      status: 'SUBMITTED',
      broker: 'Alpaca Markets',
      symbol: request.symbol,
      side: request.side,
      quantity: request.quantity,
    };
  }
}
