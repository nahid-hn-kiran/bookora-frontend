import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Pencil,
  DoorOpen,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { venueServerService } from "@/services/venue.server.service";

interface VenueDetailsPageProps {
  params: Promise<{
    venueId: string;
  }>;
}

export default async function VenueDetailsPage({
  params,
}: VenueDetailsPageProps) {
  const { venueId } = await params;

  const response = await venueServerService.getVenueById(venueId);

  const venue = response.data;

  if (!venue) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Venue not found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The venue you&apos;re looking for doesn&apos;t exist or is no longer
            available.
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
          <Link href="/dashboard/venues">
            <ArrowLeft className="size-4" />
            Back to venues
          </Link>
        </Button>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {venue.name}
                </h1>

                {venue.status && (
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
                    {venue.status.toLowerCase()}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage this venue and its bookable spaces.
              </p>
            </div>
          </div>

          <Button asChild variant="outline">
            <Link href={`/dashboard/venues/${venue.id}/edit`}>
              <Pencil className="size-4" />
              Edit venue
            </Link>
          </Button>
        </div>
      </div>

      {/* Venue information */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border bg-background p-6 lg:col-span-2">
          <div>
            <h2 className="font-semibold">Venue information</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Basic information about this venue.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {venue.description && (
              <div>
                <p className="text-sm font-medium">Description</p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {venue.description}
                </p>
              </div>
            )}

            {(venue.address || venue.city || venue.country) && (
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-sm font-medium">Location</p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {[venue.address, venue.city, venue.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quick stats */}
        <section className="rounded-xl border bg-background p-6">
          <h2 className="font-semibold">Venue overview</h2>

          <div className="mt-6 space-y-4">
            <Link
              href={`/dashboard/venues/${venue.id}/rooms`}
              className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DoorOpen className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">Rooms</p>

                <p className="text-xs text-muted-foreground">
                  Manage rooms in this venue
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock3 className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">Time slots</p>

                <p className="text-xs text-muted-foreground">
                  Manage available booking times
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rooms section */}
      <section className="rounded-xl border bg-background p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Rooms</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Rooms available inside this venue.
            </p>
          </div>

          <Button asChild>
            <Link href={`/dashboard/venues/${venue.id}/rooms/new`}>
              <DoorOpen className="size-4" />
              Add room
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex min-h-40 items-center justify-center rounded-lg border border-dashed">
          <div className="text-center">
            <DoorOpen className="mx-auto size-8 text-muted-foreground" />

            <p className="mt-3 text-sm font-medium">No rooms yet</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Rooms will appear here once you add them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
