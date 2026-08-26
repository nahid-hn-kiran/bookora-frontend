import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type {
  IBooking,
  ICreateBookingPayload,
  IUpdateBookingStatusPayload,
} from "@/types/booking.types";

const createBooking = async (payload: ICreateBookingPayload) => {
  const response = await api.post<ApiResponse<IBooking>>("/bookings", payload);

  return response.data;
};

const cancelBooking = async (bookingId: string) => {
  const response = await api.post<ApiResponse<IBooking>>(
    `/bookings/${bookingId}/cancel`,
  );

  return response.data;
};

const updateBookingStatus = async (
  bookingId: string,
  payload: IUpdateBookingStatusPayload,
) => {
  const response = await api.patch<ApiResponse<IBooking>>(
    `/bookings/${bookingId}/status`,
    payload,
  );

  return response.data;
};

export const bookingService = {
  createBooking,
  cancelBooking,
  updateBookingStatus,
};
