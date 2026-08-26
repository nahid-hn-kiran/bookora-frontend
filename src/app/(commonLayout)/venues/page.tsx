import { Building2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { VenueCard } from "@/components/modules/venues/VenueCard";
import { venueServerService } from "@/services/commonRoutes/venue/venue.service";

export default async function VenuesPage() {
  const response = await venueServerService.getVenues();

  const venues = response.data ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight">
          <Building2 className="size-7" />
          Venues
        </h1>

        <p className="mt-2 text-muted-foreground">
          Explore our available venues and find the perfect place for your
          event.
        </p>
      </div>

      {/* Venues */}
      {venues.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Building2 className="mx-auto size-10 text-muted-foreground" />

            <h2 className="mt-4 text-lg font-semibold">No venues available</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              There are currently no venues available to browse.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
