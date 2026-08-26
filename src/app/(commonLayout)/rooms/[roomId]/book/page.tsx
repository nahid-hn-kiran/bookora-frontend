import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { roomServerService } from "@/services/room.server.service";
import { timeSlotServerService } from "@/services/time-slot.server.service";
import { BookingForm } from "@/components/modules/bookings/BookingForm";

interface BookingPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { roomId } = await params;

  const [roomResponse, slotsResponse] = await Promise.all([
    roomServerService.getRoomById(roomId),
    timeSlotServerService.getTimeSlotsByRoom(roomId),
  ]);

  const room = roomResponse.data;
  const timeSlots = slotsResponse.data ?? [];

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button asChild variant="ghost" className="-ml-3">
        <Link href={`/rooms/${roomId}`}>
          <ArrowLeft className="mr-2 size-4" />
          Back to room
        </Link>
      </Button>

      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground">Book a room</p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {room.name}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Select a time slot and provide your booking details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Booking form */}
        <Card>
          <CardHeader>
            <CardTitle>Booking details</CardTitle>
          </CardHeader>

          <CardContent>
            <BookingForm room={room} timeSlots={timeSlots} />
          </CardContent>
        </Card>

        {/* Room summary */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Room summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
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
              <h3 className="font-semibold">{room.name}</h3>

              {room.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {room.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground">Capacity</p>

                <p className="mt-1 font-medium">{room.capacity} guests</p>
              </div>

              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground">Duration</p>

                <p className="mt-1 font-medium">{room.duration} min</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">Price</p>

              <p className="mt-1 text-2xl font-semibold">৳{room.price}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
