import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { IVenue } from "@/types/venue.types";

interface VenueCardProps {
  venue: IVenue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link href={`/venues/${venue.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
        <div className="aspect-video overflow-hidden bg-muted">
          {venue.image ? (
            <img
              src={venue.image}
              alt={venue.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <CardContent className="space-y-3 p-5">
          <div>
            <h3 className="text-lg font-semibold group-hover:underline">
              {venue.name}
            </h3>

            {venue.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {venue.description}
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />

              <span>
                {venue.city}, {venue.country}
              </span>
            </div>

            {venue.phone && (
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <span>{venue.phone}</span>
              </div>
            )}

            {venue.email && (
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <span className="truncate">{venue.email}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
