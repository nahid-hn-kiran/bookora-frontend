import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { timeSlotServerService } from "@/services/time-slot.server.service";
import { DeleteTimeSlotButton } from "@/components/modules/auth/dashboard/time-slots/DeleteTimeSlotButton";

interface TimeSlotDetailsPageProps {
  params: Promise<{
    timeSlotId: string;
  }>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function TimeSlotDetailsPage({
  params,
}: TimeSlotDetailsPageProps) {
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
          <Link href="/dashboard/time-slots">
            <ArrowLeft className="size-4" />
            Back to time slots
          </Link>
        </Button>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {timeSlot.room.name}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Time slot details
            </p>
          </div>

          <Badge variant={timeSlot.isAvailable ? "default" : "secondary"}>
            {timeSlot.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>

      <div className="rounded-xl border bg-background p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              Date
            </div>

            <p className="font-medium">{formatDate(timeSlot.date)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              Time
            </div>

            <p className="font-medium">
              {formatTime(timeSlot.startTime)} - {formatTime(timeSlot.endTime)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <DeleteTimeSlotButton timeSlotId={timeSlot.id} />

          <Button asChild>
            <Link href={`/dashboard/time-slots/${timeSlot.id}/edit`}>
              Edit time slot
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
