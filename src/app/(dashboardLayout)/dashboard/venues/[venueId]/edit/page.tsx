import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { venueServerService } from "@/services/venue.server.service";
import { VenueEditForm } from "@/components/modules/auth/dashboard/venues/VenueEditForm";

interface EditVenuePageProps {
  params: Promise<{
    venueId: string;
  }>;
}

export default async function EditVenuePage({ params }: EditVenuePageProps) {
  const { venueId } = await params;

  const response = await venueServerService.getVenueById(venueId);

  const venue = response.data;

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
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href={`/dashboard/venues/${venueId}`}>
            <ArrowLeft className="size-4" />
            Back to venue
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">Edit venue</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the information for{" "}
            <span className="font-medium text-foreground">{venue.name}</span>.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6 sm:p-8">
        <VenueEditForm venue={venue} />
      </div>
    </div>
  );
}
