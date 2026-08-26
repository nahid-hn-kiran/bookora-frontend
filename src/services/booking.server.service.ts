import { api } from "@/lib/axios";

import type {
  IBooking,
  ICreateBookingPayload,
  IUpdateBookingStatusPayload,
} from "@/types/booking.types";

export async function updateBookingStatus(
  bookingId: string,
  payload: IUpdateBookingStatusPayload,
) {
  const response = await api.patch<IBooking>(
    `/bookings/${bookingId}/status`,
    payload,
  );

  return response.data;
}

export const createBooking = async (payload: ICreateBookingPayload) => {
  const response = await api.post<IBooking>("/bookings", payload);

  return response.data;
};
