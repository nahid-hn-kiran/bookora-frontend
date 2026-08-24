import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { roomServerService } from "@/services/room.server.service";
import { venueServerService } from "@/services/venue.server.service";
import { RoomEditForm } from "@/components/modules/auth/dashboard/rooms/RoomEditForm";

interface EditRoomPageProps {
  params: Promise<{
    venueId: string;
    roomId: string;
  }>;
}

export default async function EditRoomPage({ params }: EditRoomPageProps) {
  const { venueId, roomId } = await params;

  const [roomResponse, venueResponse] = await Promise.all([
    roomServerService.getRoomById(roomId),
    venueServerService.getVenueById(venueId),
  ]);

  const room = roomResponse.data;
  const venue = venueResponse.data;

  if (!room || !venue) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Room not found</h1>

          <Button asChild className="mt-6">
            <Link href={`/dashboard/venues/${venueId}/rooms`}>
              <ArrowLeft className="size-4" />
              Back to rooms
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href={`/dashboard/venues/${venueId}/rooms/${roomId}`}>
            <ArrowLeft className="size-4" />
            Back to room
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">Edit room</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the information for{" "}
            <span className="font-medium text-foreground">{room.name}</span>.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6 sm:p-8">
        <RoomEditForm room={room} venueId={venueId} venueName={venue.name} />
      </div>
    </div>
  );
}
