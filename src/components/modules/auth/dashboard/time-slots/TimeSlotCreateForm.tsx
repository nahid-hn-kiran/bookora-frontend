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

interface RoomOption {
  id: string;
  name: string;
}

interface TimeSlotCreateFormProps {
  rooms: RoomOption[];
}

export function TimeSlotCreateForm({ rooms }: TimeSlotCreateFormProps) {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roomId) {
      toast.error("Please select a room.");
      return;
    }

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

      const result = await timeSlotService.createTimeSlot({
        roomId,
        date: new Date(date).toISOString(),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });

      if (!result.success) {
        toast.error(result.message || "Unable to create the time slot.");
        return;
      }

      toast.success(result.message || "Time slot created successfully.");

      router.push("/dashboard/time-slots");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to create the time slot.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="room">Room</Label>

        <select
          id="room"
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
          disabled={isLoading}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a room</option>

          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        {rooms.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No active rooms are available.
          </p>
        )}
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

      <div className="flex justify-end border-t pt-6">
        <Button type="submit" disabled={isLoading || rooms.length === 0}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create time slot"
          )}
        </Button>
      </div>
    </form>
  );
}
