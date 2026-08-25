import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BookingStatusBadge } from "@/components/modules/auth/dashboard/bookings/BookingStatusBadge";

import { BookingStatusActions } from "@/components/modules/auth/dashboard/bookings/BookingStatusActions";
import { getBookingById } from "@/services/booking.service";

interface BookingDetailsPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default async function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  const { bookingId } = await params;
  console.log(bookingId);

  const response = await getBookingById(bookingId);

  const booking = response.data;

  if (!booking) {
    return (
      <div className="space-y-4">
        <Button asChild variant="ghost">
          <Link href="/dashboard/bookings">
            <ArrowLeft className="mr-2 size-4" />
            Back to bookings
          </Link>
        </Button>

        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Booking not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href="/dashboard/bookings">
            <ArrowLeft className="mr-2 size-4" />
            Back to bookings
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {booking.bookingNumber}
          </h1>

          <p className="text-muted-foreground">
            Created {formatDateTime(booking.createdAt)}
          </p>
        </div>

        <BookingStatusBadge status={booking.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>

              <p className="font-medium">{booking.user.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>

              <p className="font-medium">{booking.user.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Guests</p>

              <p className="font-medium">{booking.guestCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>

              <p className="font-medium">
                {formatCurrency(booking.totalAmount)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>

              <BookingStatusBadge status={booking.status} />
            </div>

            {booking.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>

                <p className="font-medium">{booking.notes}</p>
              </div>
            )}

            {booking.expiresAt && (
              <div>
                <p className="text-sm text-muted-foreground">Expires</p>

                <p className="font-medium">
                  {formatDateTime(booking.expiresAt)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room & Venue</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Room</p>

              <p className="font-medium">{booking.timeSlot.room.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Venue</p>

              <p className="font-medium">{booking.timeSlot.room.venue.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Address</p>

              <p className="font-medium">
                {booking.timeSlot.room.venue.address},{" "}
                {booking.timeSlot.room.venue.city},{" "}
                {booking.timeSlot.room.venue.country}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Slot</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>

              <p className="font-medium">{formatDate(booking.timeSlot.date)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Start</p>

              <p className="font-medium">
                {formatDateTime(booking.timeSlot.startTime)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">End</p>

              <p className="font-medium">
                {formatDateTime(booking.timeSlot.endTime)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BookingStatusActions bookingId={booking.id} status={booking.status} />
    </div>
  );
}
