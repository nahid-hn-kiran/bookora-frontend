import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";

import type {
  ICreateCheckoutSessionResponse,
  ICreatePaymentIntentResponse,
} from "@/types/payment.types";

const createCheckoutSession = async (bookingId: string) => {
  const response = await api.post<ApiResponse<ICreateCheckoutSessionResponse>>(
    "/payments/create-checkout-session",
    {
      bookingId,
    },
  );

  return response.data;
};

const createPaymentIntent = async (bookingId: string) => {
  const response = await api.post<ApiResponse<ICreatePaymentIntentResponse>>(
    "/payments/create-intent",
    {
      bookingId,
    },
  );

  return response.data;
};

export const paymentService = {
  createCheckoutSession,
  createPaymentIntent,
};
