import { api } from "@/lib/axios";

import type { IBooking } from "@/types/booking.types";

const cancelBooking = async (bookingId: string) => {
  const response = await api.post<IBooking>(`/bookings/${bookingId}/cancel`);

  return response.data;
};

export const bookingService = {
  cancelBooking,
};
