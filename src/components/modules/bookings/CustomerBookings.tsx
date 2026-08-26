"use client";

import Link from "next/link";
import { CalendarDays, Clock, Eye, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BookingStatus, IBooking } from "@/types/booking.types";

interface CustomerBookingsProps {
  bookings: IBooking[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function getStatusClass(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400";

    case "CANCELLED":
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";

    case "COMPLETED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";

    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatStatus(status: BookingStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function CustomerBookings({ bookings }: CustomerBookingsProps) {
  console.log(bookings);
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-16 text-center">
        <CalendarDays className="mx-auto mb-4 size-10 text-muted-foreground" />

        <h3 className="font-semibold">No bookings yet</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Your bookings will appear here once you make a reservation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const room = booking.timeSlot.room;
        const venue = room.venue;

        return (
          <div
            key={booking.id}
            className="rounded-xl border p-5 transition-colors hover:bg-muted/30"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Main information */}
              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">{room.name}</h3>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                      booking.status,
                    )}`}
                  >
                    {formatStatus(booking.status)}
                  </span>
                </div>

                <p className="text-sm font-medium text-muted-foreground">
                  {booking.bookingNumber}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4" />
                    {formatDate(booking.timeSlot.date)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" />

                    {formatTime(booking.timeSlot.startTime)}

                    {" - "}

                    {formatTime(booking.timeSlot.endTime)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {venue.name}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    {booking.guestCount}{" "}
                    {booking.guestCount === 1 ? "guest" : "guests"}
                  </span>
                </div>
              </div>

              {/* Price and action */}
              <div className="flex shrink-0 items-center justify-between gap-6 lg:flex-col lg:items-end">
                <div className="text-right">
                  <p className="text-xl font-semibold">
                    ${(+booking.totalAmount).toFixed(2)}
                  </p>

                  <p className="text-xs text-muted-foreground">Total amount</p>
                </div>

                <Button asChild variant="outline" size="sm">
                  <Link href={`/dashboard/bookings/${booking.id}`}>
                    <Eye className="mr-2 size-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
