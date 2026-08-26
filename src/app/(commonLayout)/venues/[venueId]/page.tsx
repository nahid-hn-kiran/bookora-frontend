import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { venueServerService } from "@/services/commonRoutes/venue/venue.service";

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

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button asChild variant="ghost" className="-ml-3">
        <Link href="/venues">
          <ArrowLeft className="mr-2 size-4" />
          Back to venues
        </Link>
      </Button>

      {/* Venue */}
      <Card className="overflow-hidden">
        <div className="aspect-[21/9] overflow-hidden bg-muted">
          {venue.image ? (
            <img
              src={venue.image}
              alt={venue.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <CardContent className="space-y-6 p-6 md:p-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {venue.name}
            </h1>

            {venue.description && (
              <p className="mt-3 max-w-3xl text-muted-foreground">
                {venue.description}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 text-muted-foreground" />

              <div>
                <p className="font-medium">Location</p>

                <p className="text-sm text-muted-foreground">{venue.address}</p>

                <p className="text-sm text-muted-foreground">
                  {venue.city}, {venue.country}
                </p>
              </div>
            </div>

            {venue.phone && (
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 text-muted-foreground" />

                <div>
                  <p className="font-medium">Phone</p>

                  <p className="text-sm text-muted-foreground">{venue.phone}</p>
                </div>
              </div>
            )}

            {venue.email && (
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 text-muted-foreground" />

                <div>
                  <p className="font-medium">Email</p>

                  <p className="text-sm text-muted-foreground">{venue.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 border-t pt-6">
            <Button asChild>
              <Link href={`/rooms?venueId=${venue.id}`}>Explore Rooms</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
