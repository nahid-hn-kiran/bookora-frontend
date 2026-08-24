import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { IVenue } from "@/types/venue.types";

interface VenueListProps {
  venues: IVenue[];
}

export function VenueList({ venues }: VenueListProps) {
  if (venues.length === 0) {
    return (
      <div className="rounded-xl border bg-background p-10">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">No venues yet</h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Create your first venue to start adding rooms and managing bookable
            spaces.
          </p>

          <Button asChild className="mt-6">
            <Link href="/dashboard/venues/new">Add your first venue</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {venues.map((venue) => (
        <article
          key={venue.id}
          className="group rounded-xl border bg-background p-5 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>

            {venue.status && (
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
                {venue.status.toLowerCase()}
              </span>
            )}
          </div>

          <div className="mt-5">
            <h2 className="font-semibold">{venue.name}</h2>

            {venue.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {venue.description}
              </p>
            )}

            {(venue.address || venue.city) && (
              <p className="mt-3 text-sm text-muted-foreground">
                {[venue.address, venue.city, venue.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>

          <div className="mt-5 border-t pt-4">
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href={`/dashboard/venues/${venue.id}`}>
                View venue
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
