import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { venueServerService } from "@/services/venue.server.service";

import { VenueList } from "@/components/modules/auth/dashboard/venues/VenueList";

export default async function VenuesPage() {
  const response = await venueServerService.getVenues();

  const venues = response.data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Venues</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the venues available for Bookora bookings.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/venues/new">
            <Plus className="size-4" />
            Add venue
          </Link>
        </Button>
      </div>

      <VenueList venues={venues} />
    </div>
  );
}
