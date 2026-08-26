import { api } from "@/lib/server-fetch";

import type { IBooking } from "@/types/booking.types";

const getMyBookings = async () => {
  return api.get<IBooking[]>("/bookings/my-bookings");
};

const getBookingById = async (bookingId: string) => {
  return api.get<IBooking>(`/bookings/${bookingId}`);
};

export const bookingServerService = {
  getMyBookings,
  getBookingById,
};
