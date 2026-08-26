import { DoorOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { RoomCard } from "@/components/modules/rooms/RoomCard";
import { roomServerService } from "@/services/room.server.service";

interface RoomsPageProps {
  searchParams: Promise<{
    venueId?: string;
  }>;
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const params = await searchParams;

  const response = await roomServerService.getRooms({
    venueId: params.venueId,
  });

  const rooms = response.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight">
          <DoorOpen className="size-7" />
          Rooms
        </h1>

        <p className="mt-2 text-muted-foreground">
          Explore our available rooms and find the right space for your needs.
        </p>
      </div>

      {rooms.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <DoorOpen className="mx-auto size-10 text-muted-foreground" />

            <h2 className="mt-4 text-lg font-semibold">No rooms available</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              There are currently no rooms available to browse.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
