import Link from "next/link";
import { CalendarPlus, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { timeSlotServerService } from "@/services/time-slot.server.service";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function TimeSlotsPage() {
  const timeSlots = await timeSlotServerService.getTimeSlots();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Time Slots</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage room availability and scheduling.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/time-slots/new">
            <CalendarPlus className="size-4" />
            Create time slot
          </Link>
        </Button>
      </div>

      {timeSlots.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-background p-12 text-center">
          <Clock className="mx-auto size-10 text-muted-foreground" />

          <h2 className="mt-4 font-semibold">No time slots found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first time slot to make a room available.
          </p>

          <Button asChild className="mt-6">
            <Link href="/dashboard/time-slots/new">Create time slot</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {timeSlots.map((timeSlot) => (
            <Link
              key={timeSlot.id}
              href={`/dashboard/time-slots/${timeSlot.id}`}
              className="group"
            >
              <div className="rounded-xl border bg-background p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold">{timeSlot.room.name}</h2>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(timeSlot.date)}</span>

                      <span>•</span>

                      <span>
                        {formatTime(timeSlot.startTime)} -{" "}
                        {formatTime(timeSlot.endTime)}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={timeSlot.isAvailable ? "default" : "secondary"}
                  >
                    {timeSlot.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
