import { IPaymentProvider, PaymentRequest, PaymentResponse } from './IPaymentProvider';

export class StripeAdapter implements IPaymentProvider {
  public async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `stripe_txn_${Date.now()}`,
      status: 'SUCCESS',
      amount: request.amount,
      provider: 'Stripe',
    };
  }

  public async createSubscription(_userId: string, _planTier: string): Promise<any> {
    return { subscriptionId: `sub_stripe_${Date.now()}`, status: 'active' };
  }

  public async cancelSubscription(_userId: string): Promise<boolean> {
    return true;
  }
}
