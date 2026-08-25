import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TimeSlotCreateForm } from "@/components/modules/auth/dashboard/time-slots/TimeSlotCreateForm";
import { roomServerService } from "@/services/room.server.service";

export default async function CreateTimeSlotPage() {
  const response = await roomServerService.getRooms();

  const rooms = response.data ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button asChild variant="ghost" className="-ml-3">
          <Link href="/dashboard/time-slots">
            <ArrowLeft className="size-4" />
            Back to time slots
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create time slot
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a new availability slot for a room.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6 sm:p-8">
        <TimeSlotCreateForm rooms={rooms} />
      </div>
    </div>
  );
}
