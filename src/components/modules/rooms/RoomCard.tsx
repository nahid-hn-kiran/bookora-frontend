import Link from "next/link";
import { ArrowRight, Clock3, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { IRoom } from "@/types/room.types";

interface RoomCardProps {
  room: IRoom;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link href={`/rooms/${room.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
        {/* Image */}
        <div className="aspect-video overflow-hidden bg-muted">
          {room.image ? (
            <img
              src={room.image}
              alt={room.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <CardContent className="space-y-4 p-5">
          {/* Name / Description */}
          <div>
            <h2 className="text-lg font-semibold">{room.name}</h2>

            {room.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {room.description}
              </p>
            )}
          </div>

          {/* Room information */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4 shrink-0" />

              <span>Up to {room.capacity}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="size-4 shrink-0" />

              <span>{room.duration} min</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between border-t pt-4">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>

              <p className="text-lg font-semibold">৳{room.price}</p>
            </div>

            <div className="flex items-center gap-1 text-sm font-medium">
              View room
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
