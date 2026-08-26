import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type { IBooking, ICreateBookingPayload } from "@/types/booking.types";

const cancelBooking = async (bookingId: string) => {
  const response = await api.post<ApiResponse<IBooking>>(
    `/bookings/${bookingId}/cancel`,
  );

  return response.data;
};

const createBooking = async (payload: ICreateBookingPayload) => {
  const response = await api.post<ApiResponse<IBooking>>("/bookings", payload);

  return response.data;
};

export const bookingService = {
  cancelBooking,
  createBooking,
};
