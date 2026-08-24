import Link from "next/link";
import { ArrowLeft, DoorOpen, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { venueServerService } from "@/services/venue.server.service";
import { roomServerService } from "@/services/room.server.service";
import { RoomList } from "@/components/modules/auth/dashboard/rooms/RoomList";

interface RoomsPageProps {
  params: Promise<{
    venueId: string;
  }>;
}

export default async function RoomsPage({ params }: RoomsPageProps) {
  const { venueId } = await params;

  const [venueResponse, roomsResponse] = await Promise.all([
    venueServerService.getVenueById(venueId),
    roomServerService.getRooms(),
  ]);

  const venue = venueResponse.data;

  const rooms =
    roomsResponse.data?.filter((room) => room.venueId === venueId) ?? [];

  if (!venue) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Venue not found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This venue doesn&apos;t exist or is no longer available.
          </p>

          <Button asChild className="mt-6">
            <Link href="/dashboard/venues">
              <ArrowLeft className="size-4" />
              Back to venues
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href={`/dashboard/venues/${venueId}`}>
            <ArrowLeft className="size-4" />
            Back to venue
          </Link>
        </Button>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DoorOpen className="size-5" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Rooms</h1>

                <p className="text-sm text-muted-foreground">{venue.name}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Manage the rooms available for booking at this venue.
            </p>
          </div>

          <Button asChild>
            <Link href={`/dashboard/venues/${venueId}/rooms/new`}>
              <Plus className="size-4" />
              Add room
            </Link>
          </Button>
        </div>
      </div>

      {/* Rooms */}
      <RoomList rooms={rooms} venueId={venueId} />
    </div>
  );
}
