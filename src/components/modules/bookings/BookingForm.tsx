"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

import type { IRoom } from "@/types/room.types";
import type { ITimeSlot } from "@/types/time-slot.types";
import { bookingService } from "@/services/bookings/booking.service";

interface BookingFormProps {
  roomId: string;
  room: IRoom;
  timeSlots: ITimeSlot[];
}

export default function BookingForm({ room, timeSlots }: BookingFormProps) {
  const router = useRouter();

  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupedSlots = useMemo(() => {
    return timeSlots.reduce<Record<string, ITimeSlot[]>>((groups, slot) => {
      const date = new Date(slot.date).toLocaleDateString("en-CA");

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(slot);

      return groups;
    }, {});
  }, [timeSlots]);

  console.log(timeSlots);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTimeSlotId) {
      toast.error("Please select a time slot.");
      return;
    }

    const guests = Number(guestCount);

    if (!Number.isInteger(guests) || guests < 1) {
      toast.error("Please enter a valid guest count.");
      return;
    }

    if (guests > room.capacity) {
      toast.error(
        `This room can accommodate a maximum of ${room.capacity} guests.`,
      );
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Hola");

      const response = await bookingService.createBooking({
        timeSlotId: selectedTimeSlotId,
        guestCount: guests,
        notes: notes.trim() || undefined,
      });

      console.log("res", response);

      toast.success("Booking created successfully.");

      router.push(`/me/bookings/${response.data.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create booking.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Time slots */}
      <div className="space-y-5">
        {Object.entries(groupedSlots).map(([date, slots]) => (
          <div key={date} className="space-y-3">
            <div>
              <h3 className="font-medium">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {slots.map((slot) => {
                const isSelected = selectedTimeSlotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedTimeSlotId(slot.id)}
                    className={[
                      "rounded-lg border p-4 text-left transition",
                      "hover:border-primary hover:bg-accent/50",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "",
                    ].join(" ")}
                  >
                    <p className="font-medium">
                      {new Date(slot.startTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      to{" "}
                      {new Date(slot.endTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Guest count */}
      <div className="space-y-2">
        <Label htmlFor="guestCount">Number of guests</Label>

        <Input
          id="guestCount"
          type="number"
          min={1}
          max={room.capacity}
          value={guestCount}
          onChange={(event) => setGuestCount(event.target.value)}
        />

        <p className="text-xs text-muted-foreground">
          Maximum {room.capacity} guests.
        </p>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes <span className="text-muted-foreground">(optional)</span>
        </Label>

        <Textarea
          id="notes"
          placeholder="Anything we should know about your booking?"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
        />
      </div>

      {/* Summary */}
      <Card className="bg-muted/30 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Booking total</span>

          <span className="text-xl font-semibold">৳{room.price}</span>
        </div>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !selectedTimeSlotId}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Creating booking...
          </>
        ) : (
          "Confirm booking"
        )}
      </Button>
    </form>
  );
}
