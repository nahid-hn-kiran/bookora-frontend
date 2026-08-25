export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface IBookingUser {
  id: string;
  name: string;
  email: string;
}

export interface IBookingVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface IBookingRoom {
  id: string;
  name: string;
  description?: string | null;
  capacity: number;
  price: number;
  duration: number;
  difficulty?: string | null;
  image?: string | null;
  status: string;
  venue: IBookingVenue;
}

export interface IBookingTimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  room: IBookingRoom;
}

export interface IBookingPayment {
  id: string;
  status: string;
  amount?: number | null;
  paymentIntentId?: string | null;
  checkoutSessionId?: string | null;
}

export interface IBooking {
  id: string;
  bookingNumber: string;
  userId: string;
  timeSlotId: string;
  guestCount: number;
  totalAmount: number;
  status: BookingStatus;
  notes?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;

  user: IBookingUser;
  timeSlot: IBookingTimeSlot;
  payment?: IBookingPayment | null;
}

export interface IUpdateBookingStatusPayload {
  status: BookingStatus;
}
