export interface ICreateCheckoutSessionResponse {
  sessionId: string;
  url: string | null;
}

export interface ICreatePaymentIntentResponse {
  clientSecret: string | null;
  paymentIntentId: string;
}
