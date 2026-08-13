export interface LinkedBrokerItem {
  id: string;
  brokerName: string;
  accountName: string;
  accountNumber: string;
  cashBalance: number;
  buyingPower: number;
  status: 'CONNECTED' | 'DISCONNECTED' | 'REAUTH_NEEDED';
  lastSynced: string;
}

export interface BrokerOrderRequest {
  brokerAccountId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
}

export interface IBrokerAdapter {
  connect(credentials: any): Promise<boolean>;
  getAccountDetails(): Promise<LinkedBrokerItem>;
  placeOrder(request: BrokerOrderRequest): Promise<any>;
}
