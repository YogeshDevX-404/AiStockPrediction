import { IBrokerAdapter, LinkedBrokerItem, BrokerOrderRequest } from './IBrokerAdapter';

export class ZerodhaKiteAdapter implements IBrokerAdapter {
  public async connect(_credentials: any): Promise<boolean> {
    return true;
  }

  public async getAccountDetails(): Promise<LinkedBrokerItem> {
    return {
      id: 'brk-1',
      brokerName: 'Zerodha Kite',
      accountName: 'Zerodha Pro Trading Account',
      accountNumber: 'ZR84920',
      cashBalance: 450000.0,
      buyingPower: 900000.0,
      status: 'CONNECTED',
      lastSynced: new Date().toISOString(),
    };
  }

  public async placeOrder(request: BrokerOrderRequest): Promise<any> {
    return {
      orderId: `kite-${Date.now()}`,
      status: 'SUBMITTED',
      broker: 'Zerodha Kite',
      symbol: request.symbol,
      side: request.side,
      quantity: request.quantity,
    };
  }
}
