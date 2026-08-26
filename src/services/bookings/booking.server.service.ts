import { api } from "@/lib/server-fetch";

import type { IBooking } from "@/types/booking.types";

const getMyBookings = async () => {
  const response = await api.get<IBooking[]>("/bookings/my-bookings");

  return response.data;
};

const getBookingById = async (bookingId: string) => {
  const response = await api.get<IBooking>(`/bookings/${bookingId}`);

  return response.data;
};

export const bookingServerService = {
  getMyBookings,
  getBookingById,
};
