import type { IVenue } from "@/types/venue.types";

import { VenueCard } from "./VenueCard";

interface VenuesListProps {
  venues: IVenue[];
}

export function VenuesList({ venues }: VenuesListProps) {
  if (venues.length === 0) {
    return (
      <div className="rounded-lg border py-16 text-center">
        <h3 className="font-medium">No venues found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          There are currently no venues available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
