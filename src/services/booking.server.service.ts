import { api } from "@/lib/axios";

import type {
  IBooking,
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
