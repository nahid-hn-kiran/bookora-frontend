"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import type { IRoom } from "@/types/room.types";
import type { ITimeSlot } from "@/types/time-slot.types";
import { createBooking } from "@/services/booking.server.service";

interface BookingFormProps {
  room: IRoom;
  timeSlots: ITimeSlot[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(time: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(time));
}

export function BookingForm({ room, timeSlots }: BookingFormProps) {
  const router = useRouter();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTimeSlot) {
      toast.error("Please select a time slot.");
      return;
    }

    if (guestCount < 1) {
      toast.error("Guest count must be at least 1.");
      return;
    }

    if (guestCount > room.capacity) {
      toast.error(
        `This room can accommodate a maximum of ${room.capacity} guests.`,
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const booking = await createBooking({
        timeSlotId: selectedTimeSlot,
        guestCount,
        notes: notes.trim() || undefined,
      });

      toast.success("Booking created successfully.");

      router.push(`/me/bookings/${booking.id}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create booking.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Time slots */}
      <div className="space-y-3">
        <Label>Select a time slot</Label>

        {timeSlots.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="font-medium">No available time slots</p>

            <p className="mt-1 text-sm text-muted-foreground">
              There are currently no time slots available for this room.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {timeSlots.map((slot) => {
              const selected = selectedTimeSlot === slot.id;

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot.id)}
                  className={[
                    "rounded-lg border p-4 text-left transition-colors",
                    "hover:bg-accent",
                    selected
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "",
                  ].join(" ")}
                >
                  <p className="font-medium">{formatDate(slot.date)}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatTime(slot.startTime)}
                    {" – "}
                    {formatTime(slot.endTime)}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Guest count */}
      <div className="space-y-2">
        <Label htmlFor="guestCount">Number of guests</Label>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={guestCount <= 1}
            onClick={() => setGuestCount((current) => Math.max(1, current - 1))}
          >
            −
          </Button>

          <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-background font-medium">
            {guestCount}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={guestCount >= room.capacity}
            onClick={() =>
              setGuestCount((current) => Math.min(room.capacity, current + 1))
            }
          >
            +
          </Button>

          <span className="text-sm text-muted-foreground">
            Maximum {room.capacity}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes
          <span className="ml-1 text-muted-foreground">(optional)</span>
        </Label>

        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Anything you'd like us to know?"
          rows={4}
        />
      </div>

      {/* Price */}
      <div className="rounded-lg bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total amount</span>

          <span className="text-xl font-semibold">৳{room.price}</span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          The final amount is based on the selected room.
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || timeSlots.length === 0}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Creating booking...
          </>
        ) : (
          "Continue with booking"
        )}
      </Button>
    </form>
  );
}
