import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VenueForm } from "@/components/modules/auth/dashboard/venues/VenueForm";

export default function NewVenuePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href="/dashboard/venues">
            <ArrowLeft className="size-4" />
            Back to venues
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">Add a venue</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Add a new location where customers can book rooms and available time
            slots.
          </p>
        </div>
      </div>

      <VenueForm />
    </div>
  );
}
