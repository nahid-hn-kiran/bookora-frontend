import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { timeSlotServerService } from "@/services/time-slot.server.service";
import { TimeSlotEditForm } from "@/components/modules/auth/dashboard/time-slots/TimeSlotEditForm";

interface EditTimeSlotPageProps {
  params: Promise<{
    timeSlotId: string;
  }>;
}

export default async function EditTimeSlotPage({
  params,
}: EditTimeSlotPageProps) {
  const { timeSlotId } = await params;

  const timeSlot = await timeSlotServerService.getTimeSlotById(timeSlotId);

  if (!timeSlot) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Time slot not found</h1>

          <Button asChild className="mt-6">
            <Link href="/dashboard/time-slots">
              <ArrowLeft className="size-4" />
              Back to time slots
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
          <Link href={`/dashboard/time-slots/${timeSlot.id}`}>
            <ArrowLeft className="size-4" />
            Back to time slot
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit time slot
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the schedule for{" "}
            <span className="font-medium text-foreground">
              {timeSlot.room.name}
            </span>
            .
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6 sm:p-8">
        <TimeSlotEditForm timeSlot={timeSlot} />
      </div>
    </div>
  );
}
