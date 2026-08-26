import { api } from "@/lib/server-fetch";

import type { IBooking, ICreateBookingPayload } from "@/types/booking.types";

export async function getAllBookings() {
  return api.get<IBooking[]>("/bookings");
}

export async function getBookingById(bookingId: string) {
  return api.get<IBooking>(`/bookings/admin/${bookingId}`);
}
