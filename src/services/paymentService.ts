import { PricingPlan } from '../types';

export interface PaymentInitParams {
  planId: string;
  planName: string;
  amount: number;
  userName: string;
  userEmail: string;
  userPhone?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  planId: string;
  amount: number;
  message: string;
  timestamp: string;
}

/**
 * Payment Service Abstraction
 * Configured for instant demo mode, designed with standard hooks ready for
 * Razorpay Checkout, Cashfree PG, or PayU Web SDK.
 */
export const paymentService = {
  async processPayment(params: PaymentInitParams): Promise<PaymentResult> {
    // Simulate network latency for payment gateway modal
    await new Promise((resolve) => setTimeout(resolve, 800));

    const txnId = `TXN_GM_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      transactionId: txnId,
      planId: params.planId,
      amount: params.amount,
      message: `Festival Pass activated successfully! Welcome to GarbaMitra Premium.`,
      timestamp: new Date().toISOString()
    };
  },

  getRazorpayConfig(params: PaymentInitParams, onVerification: (res: PaymentResult) => void) {
    return {
      key: 'rzp_test_GarbaMitraNavratri2026',
      amount: params.amount * 100, // in paise
      currency: 'INR',
      name: 'GarbaMitra',
      description: `Upgrade to ${params.planName}`,
      image: '/favicon.svg',
      prefill: {
        name: params.userName,
        email: params.userEmail,
        contact: params.userPhone || '9876543210'
      },
      theme: {
        color: '#6B21A8'
      },
      handler: function (response: any) {
        onVerification({
          success: true,
          transactionId: response.razorpay_payment_id || `TXN_${Date.now()}`,
          planId: params.planId,
          amount: params.amount,
          message: 'Payment verified via Razorpay Gateway',
          timestamp: new Date().toISOString()
        });
      }
    };
  }
};
