import { IPaymentProvider, PaymentRequest, PaymentResponse } from './IPaymentProvider';

export class RazorpayAdapter implements IPaymentProvider {
  public async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return {
      transactionId: `rzp_pay_${Date.now()}`,
      status: 'SUCCESS',
      amount: request.amount,
      provider: 'Razorpay',
    };
  }

  public async createSubscription(_userId: string, _planTier: string): Promise<any> {
    return { subscriptionId: `sub_rzp_${Date.now()}`, status: 'active' };
  }

  public async cancelSubscription(_userId: string): Promise<boolean> {
    return true;
  }
}
