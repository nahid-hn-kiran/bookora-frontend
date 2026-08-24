import Link from "next/link";
import { DoorOpen, Pencil, Users, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { IRoom } from "@/types/room.types";

interface RoomListProps {
  rooms: IRoom[];
  venueId: string;
}

export function RoomList({ rooms, venueId }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-xl border border-dashed bg-background">
        <div className="max-w-sm text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted">
            <DoorOpen className="size-6 text-muted-foreground" />
          </div>

          <h2 className="mt-4 font-semibold">No rooms yet</h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This venue doesn&apos;t have any rooms yet. Add your first room to
            make it available for bookings.
          </p>

          <Button asChild className="mt-5">
            <Link href={`/dashboard/venues/${venueId}/rooms/new`}>
              Add your first room
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="rounded-xl border bg-background p-5 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DoorOpen className="size-5" />
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-semibold">{room.name}</h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  {room.difficulty || "Standard"}
                </p>
              </div>
            </div>

            {room.status && (
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
                {room.status.toLowerCase()}
              </span>
            )}
          </div>

          {room.description && (
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {room.description}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4" />
                <span className="text-xs">Capacity</span>
              </div>

              <p className="mt-1 text-sm font-medium">{room.capacity} people</p>
            </div>

            <div className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock3 className="size-4" />
                <span className="text-xs">Duration</span>
              </div>

              <p className="mt-1 text-sm font-medium">{room.duration} min</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>

              <p className="font-semibold">৳{room.price}</p>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/venues/${venueId}/rooms/${room.id}`}>
                View room
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
