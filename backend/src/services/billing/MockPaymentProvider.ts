import { IPaymentProvider, PaymentRequest, PaymentResponse } from './IPaymentProvider';

export class MockPaymentProvider implements IPaymentProvider {
  public async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `mock_txn_${Date.now()}`,
      status: 'SUCCESS',
      amount: request.amount,
      provider: 'MockProvider',
    };
  }

  public async createSubscription(_userId: string, _planTier: string): Promise<any> {
    return { subscriptionId: `mock_sub_${Date.now()}`, status: 'active' };
  }

  public async cancelSubscription(_userId: string): Promise<boolean> {
    return true;
  }
}
