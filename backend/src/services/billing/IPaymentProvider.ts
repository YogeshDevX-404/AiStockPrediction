export interface PaymentRequest {
  amount: number;
  currency: string;
  planTier: 'FREE' | 'PRO' | 'ENTERPRISE';
  userId: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  amount: number;
  provider: string;
}

export interface IPaymentProvider {
  processPayment(request: PaymentRequest): Promise<PaymentResponse>;
  createSubscription(userId: string, planTier: string): Promise<any>;
  cancelSubscription(userId: string): Promise<boolean>;
}
