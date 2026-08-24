import Link from "next/link";
import { ArrowLeft, Clock3, DoorOpen, Pencil, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import { roomServerService } from "@/services/room.server.service";
import { venueServerService } from "@/services/venue.server.service";
import { DeleteRoomButton } from "@/components/modules/auth/dashboard/rooms/DeleteRoomButton";

interface RoomDetailsPageProps {
  params: Promise<{
    venueId: string;
    roomId: string;
  }>;
}

export default async function RoomDetailsPage({
  params,
}: RoomDetailsPageProps) {
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

          <p className="mt-2 text-sm text-muted-foreground">
            This room doesn&apos;t exist or is no longer available.
          </p>

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
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href={`/dashboard/venues/${venueId}/rooms`}>
            <ArrowLeft className="size-4" />
            Back to rooms
          </Link>
        </Button>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <DoorOpen className="size-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {room.name}
                </h1>

                {room.status && (
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
                    {room.status.toLowerCase()}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">{venue.name}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/dashboard/venues/${venueId}/rooms/${roomId}/edit`}>
                <Pencil className="size-4" />
                Edit room
              </Link>
            </Button>

            <DeleteRoomButton roomId={roomId} venueId={venueId} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border bg-background p-6 lg:col-span-2">
          <h2 className="font-semibold">Room information</h2>

          {room.description && (
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {room.description}
            </p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-muted/50 p-4">
              <Users className="size-5 text-muted-foreground" />

              <p className="mt-3 text-xs text-muted-foreground">Capacity</p>

              <p className="mt-1 font-semibold">{room.capacity} people</p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <Clock3 className="size-5 text-muted-foreground" />

              <p className="mt-3 text-xs text-muted-foreground">Duration</p>

              <p className="mt-1 font-semibold">{room.duration} minutes</p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-lg font-semibold">৳{room.price}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Price per booking
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-background p-6">
          <h2 className="font-semibold">Room details</h2>

          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-xs text-muted-foreground">Difficulty</dt>

              <dd className="mt-1 text-sm font-medium">
                {room.difficulty || "Not specified"}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-muted-foreground">Venue</dt>

              <dd className="mt-1 text-sm font-medium">{venue.name}</dd>
            </div>

            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>

              <dd className="mt-1 text-sm font-medium capitalize">
                {room.status?.toLowerCase() || "Not specified"}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
