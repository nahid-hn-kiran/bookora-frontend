import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roomServerService } from "@/services/room.server.service";
import { timeSlotServerService } from "@/services/time-slot.server.service";
import BookingForm from "@/components/modules/bookings/BookingForm";

interface BookingPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { roomId } = await params;

  const [roomResponse, timeSlots] = await Promise.all([
    roomServerService.getRoomById(roomId),
    timeSlotServerService.getTimeSlots({
      roomId,
    }),
  ]);

  console.log(roomResponse);

  const room = roomResponse.data;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="-ml-3">
        <Link href={`/rooms/${roomId}`}>
          <ArrowLeft className="mr-2 size-4" />
          Back to room
        </Link>
      </Button>

      <div>
        <p className="text-sm text-muted-foreground">Booking</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Book {room.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          Choose an available time slot and provide your booking details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Room summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Room details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {room.image && (
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div>
              <h2 className="font-semibold">{room.name}</h2>

              {room.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {room.description}
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Users className="size-4 text-muted-foreground" />

                <span>Up to {room.capacity} people</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="size-4 text-muted-foreground" />

                <span>{room.duration} minutes</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold">৳</span>

                <span>৳{room.price} per booking</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Select a time slot</CardTitle>
          </CardHeader>

          <CardContent>
            {timeSlots.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed px-6 text-center">
                <CalendarDays className="size-10 text-muted-foreground" />

                <h2 className="mt-4 font-semibold">No available time slots</h2>

                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  There are currently no available time slots for this room.
                  Please check again later or browse another room.
                </p>

                <Button asChild variant="outline" className="mt-5">
                  <Link href="/rooms">Browse rooms</Link>
                </Button>
              </div>
            ) : (
              <BookingForm roomId={room.id} room={room} timeSlots={timeSlots} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
