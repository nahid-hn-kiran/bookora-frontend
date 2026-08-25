import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BookingStatusBadge } from "@/components/modules/auth/dashboard/bookings/BookingStatusBadge";
import { getAllBookings } from "@/services/booking.service";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(new Date(date));
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default async function BookingsPage() {
  const response = await getAllBookings();

  const bookings = response.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>

        <p className="text-muted-foreground">
          Manage customer bookings and their status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({bookings.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {bookings.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 font-medium">Booking</th>

                    <th className="px-4 py-3 font-medium">Customer</th>

                    <th className="px-4 py-3 font-medium">Room</th>

                    <th className="px-4 py-3 font-medium">Schedule</th>

                    <th className="px-4 py-3 font-medium">Guests</th>

                    <th className="px-4 py-3 font-medium">Amount</th>

                    <th className="px-4 py-3 font-medium">Status</th>

                    <th className="px-4 py-3 text-right font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="px-4 py-4 font-medium">
                        {booking.bookingNumber}
                      </td>

                      <td className="px-4 py-4">
                        <div className="space-y-0.5">
                          <p className="font-medium">{booking.user.name}</p>

                          <p className="text-xs text-muted-foreground">
                            {booking.user.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="space-y-0.5">
                          <p className="font-medium">
                            {booking.timeSlot.room.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {booking.timeSlot.room.venue.name}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="space-y-0.5">
                          <p>{formatDate(booking.timeSlot.date)}</p>

                          <p className="text-xs text-muted-foreground">
                            {formatTime(booking.timeSlot.startTime)} -{" "}
                            {formatTime(booking.timeSlot.endTime)}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4">{booking.guestCount}</td>

                      <td className="px-4 py-4">
                        {formatCurrency(booking.totalAmount)}
                      </td>

                      <td className="px-4 py-4">
                        <BookingStatusBadge status={booking.status} />
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/dashboard/bookings/${booking.id}`}>
                            <Eye className="size-4" />
                            <span className="sr-only">View booking</span>
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
