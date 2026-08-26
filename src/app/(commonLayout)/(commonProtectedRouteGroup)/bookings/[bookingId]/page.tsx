import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  CreditCard,
  MapPin,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingServerService } from "@/services/bookings/booking.server.service";
import { CancelBookingButton } from "@/components/modules/bookings/CancelBookingButton";

interface BookingDetailsPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function getStatusClass(status: string) {
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

export default async function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  const { bookingId } = await params;

  const response = await bookingServerService.getBookingById(bookingId);

  const booking = response.data;

  const room = booking.timeSlot.room;
  const venue = room.venue;

  const canCancel =
    booking.status === "PENDING" || booking.status === "CONFIRMED";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button asChild variant="ghost" className="-ml-3 mb-2">
            <Link href="/dashboard/bookings">
              <ArrowLeft className="mr-2 size-4" />
              Back to bookings
            </Link>
          </Button>

          <h1 className="text-2xl font-semibold tracking-tight">
            Booking Details
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {booking.bookingNumber}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${getStatusClass(
            booking.status,
          )}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Booking information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Room</p>

              <p className="mt-1 text-lg font-semibold">{room.name}</p>

              {room.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {room.description}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 size-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Date</p>

                  <p className="font-medium">
                    {formatDate(booking.timeSlot.date)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-0.5 size-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Time</p>

                  <p className="font-medium">
                    {formatTime(booking.timeSlot.startTime)} -{" "}
                    {formatTime(booking.timeSlot.endTime)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="mt-0.5 size-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>

                  <p className="font-medium">{booking.guestCount}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 text-muted-foreground" />

                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>

                  <p className="font-medium">{venue.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {venue.address}, {venue.city}, {venue.country}
                  </p>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium">Notes</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {booking.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <CreditCard className="size-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">Payment status</p>

                <p className="font-medium">
                  {booking.payment?.status ?? "Not paid"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total</p>

              <p className="text-2xl font-bold">
                ${(+booking.totalAmount).toFixed(2)}
              </p>
            </div>

            {canCancel && <CancelBookingButton bookingId={booking.id} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
