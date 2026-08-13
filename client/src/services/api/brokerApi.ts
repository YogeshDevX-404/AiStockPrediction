import { apiClient } from '@/api';

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

export const BrokerApi = {
  getAccounts: async (): Promise<LinkedBrokerItem[]> => {
    const response: any = await apiClient.get('/broker/accounts');
    return response.data;
  },

  submitOrder: async (request: BrokerOrderRequest): Promise<any> => {
    const response: any = await apiClient.post('/broker/orders', request);
    return response.data;
  },
};
