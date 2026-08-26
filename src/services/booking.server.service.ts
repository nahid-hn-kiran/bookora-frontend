import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type {
  IBooking,
  IUpdateBookingStatusPayload,
} from "@/types/booking.types";

export async function updateBookingStatus(
  bookingId: string,
  payload: IUpdateBookingStatusPayload,
) {
  const response = await api.patch<ApiResponse<IBooking>>(
    `/bookings/${bookingId}/status`,
    payload,
  );

  return response.data;
}
