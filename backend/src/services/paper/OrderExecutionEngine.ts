export interface PaperOrderItem {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP';
  quantity: number;
  price: number;
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'REJECTED';
  createdAt: string;
}

export class OrderExecutionEngine {
  public static getOrders(): PaperOrderItem[] {
    return [
      { id: 'ord-1', symbol: 'NVDA', side: 'BUY', orderType: 'MARKET', quantity: 20, price: 135.5, status: 'EXECUTED', createdAt: '2026-03-25T14:15:00Z' },
      { id: 'ord-2', symbol: 'TSLA', side: 'BUY', orderType: 'LIMIT', quantity: 15, price: 230.0, status: 'PENDING', createdAt: '2026-03-25T12:00:00Z' },
      { id: 'ord-3', symbol: 'AAPL', side: 'SELL', orderType: 'LIMIT', quantity: 10, price: 230.0, status: 'CANCELLED', createdAt: '2026-03-24T16:45:00Z' },
    ];
  }

  public static async submitOrder(orderInput: any): Promise<PaperOrderItem> {
    return {
      id: `ord-${Date.now()}`,
      symbol: orderInput.symbol.toUpperCase(),
      side: orderInput.side || 'BUY',
      orderType: orderInput.orderType || 'MARKET',
      quantity: Number(orderInput.quantity) || 1,
      price: Number(orderInput.price) || 100.0,
      status: orderInput.orderType === 'LIMIT' ? 'PENDING' : 'EXECUTED',
      createdAt: new Date().toISOString(),
    };
  }

  public static async cancelOrder(id: string): Promise<boolean> {
    return true;
  }
}
