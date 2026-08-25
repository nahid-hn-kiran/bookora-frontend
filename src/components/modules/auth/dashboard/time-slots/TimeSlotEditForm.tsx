/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { timeSlotService } from "@/services/time-slot.service";

import type { ITimeSlot } from "@/types/time-slot.types";

interface TimeSlotEditFormProps {
  timeSlot: ITimeSlot;
}

function toDateInputValue(value: string) {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toDateTimeInputValue(value: string) {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function TimeSlotEditForm({ timeSlot }: TimeSlotEditFormProps) {
  const router = useRouter();

  const [date, setDate] = useState(toDateInputValue(timeSlot.date));

  const [startTime, setStartTime] = useState(
    toDateTimeInputValue(timeSlot.startTime),
  );

  const [endTime, setEndTime] = useState(
    toDateTimeInputValue(timeSlot.endTime),
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date || !startTime || !endTime) {
      toast.error("Please fill in all date and time fields.");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      toast.error("Start time must be before end time.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await timeSlotService.updateTimeSlot(timeSlot.id, {
        date: new Date(date).toISOString(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });

      if (!result.success) {
        toast.error(result.message || "Unable to update the time slot.");
        return;
      }

      toast.success(result.message || "Time slot updated successfully.");

      router.push(`/dashboard/time-slots/${timeSlot.id}`);

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to update the time slot.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Room</p>

        <p className="mt-1 font-medium">{timeSlot.room.name}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>

        <Input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start time</Label>

          <Input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">End time</Label>

          <Input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.push(`/dashboard/time-slots/${timeSlot.id}`)}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving changes...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  );
}
