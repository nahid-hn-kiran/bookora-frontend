import Link from "next/link";
import { ArrowLeft, Clock3, DoorOpen, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { roomServerService } from "@/services/room.server.service";

interface RoomDetailsPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function RoomDetailsPage({
  params,
}: RoomDetailsPageProps) {
  const { roomId } = await params;

  const response = await roomServerService.getRoomById(roomId);

  const room = response.data;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button asChild variant="ghost" className="-ml-3">
        <Link href="/rooms">
          <ArrowLeft className="mr-2 size-4" />
          Back to rooms
        </Link>
      </Button>

      {/* Main room card */}
      <Card className="overflow-hidden">
        {/* Image */}
        <div className="aspect-[21/9] overflow-hidden bg-muted">
          {room.image ? (
            <img
              src={room.image}
              alt={room.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <CardContent className="space-y-8 p-6 md:p-8">
          {/* Heading */}
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DoorOpen className="size-4" />
              Room
            </div>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {room.name}
            </h1>

            {room.description && (
              <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                {room.description}
              </p>
            )}
          </div>

          {/* Room details */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <Users className="size-5 text-muted-foreground" />

              <p className="mt-3 text-sm text-muted-foreground">Capacity</p>

              <p className="mt-1 font-semibold">{room.capacity} people</p>
            </div>

            <div className="rounded-lg border p-4">
              <Clock3 className="size-5 text-muted-foreground" />

              <p className="mt-3 text-sm text-muted-foreground">Duration</p>

              <p className="mt-1 font-semibold">{room.duration} minutes</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Difficulty</p>

              <p className="mt-1 font-semibold">
                {room.difficulty || "Not specified"}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Price</p>

              <p className="mt-1 text-xl font-semibold">৳{room.price}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={`/bookings/create?roomId=${room.id}`}>
                Book this room
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/rooms">Browse other rooms</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
