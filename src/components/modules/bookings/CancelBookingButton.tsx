"use client";

import { useState } from "react";
import { Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { bookingService } from "@/services/bookings/booking.service";

interface CancelBookingButtonProps {
  bookingId: string;
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const router = useRouter();

  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsCancelling(true);

      await bookingService.cancelBooking(bookingId);

      toast.success("Booking cancelled successfully.");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel booking.",
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full"
      disabled={isCancelling}
      onClick={handleCancel}
    >
      {isCancelling ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Cancelling...
        </>
      ) : (
        <>
          <XCircle className="mr-2 size-4" />
          Cancel Booking
        </>
      )}
    </Button>
  );
}
