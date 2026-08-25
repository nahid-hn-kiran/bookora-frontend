"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import type { BookingStatus } from "@/types/booking.types";
import { updateBookingStatus } from "@/services/booking.server.service";

interface BookingStatusActionsProps {
  bookingId: string;
  status: BookingStatus;
}

export function BookingStatusActions({
  bookingId,
  status,
}: BookingStatusActionsProps) {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] = useState<BookingStatus | null>(
    null,
  );

  async function handleStatusUpdate(newStatus: BookingStatus) {
    try {
      setLoadingStatus(newStatus);

      await updateBookingStatus(bookingId, {
        status: newStatus,
      });

      toast.success("Booking status updated successfully.");

      router.refresh();
    } catch (error) {
      console.error("Failed to update booking status:", error);

      toast.error("Failed to update booking status.");
    } finally {
      setLoadingStatus(null);
    }
  }

  if (status === "CANCELLED" || status === "COMPLETED") {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {status === "PENDING" && (
        <>
          <Button
            disabled={loadingStatus !== null}
            onClick={() => handleStatusUpdate("CONFIRMED")}
          >
            {loadingStatus === "CONFIRMED" && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Confirm Booking
          </Button>

          <Button
            variant="destructive"
            disabled={loadingStatus !== null}
            onClick={() => handleStatusUpdate("CANCELLED")}
          >
            {loadingStatus === "CANCELLED" && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Cancel Booking
          </Button>
        </>
      )}

      {status === "CONFIRMED" && (
        <>
          <Button
            disabled={loadingStatus !== null}
            onClick={() => handleStatusUpdate("COMPLETED")}
          >
            {loadingStatus === "COMPLETED" && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Mark Completed
          </Button>

          <Button
            variant="destructive"
            disabled={loadingStatus !== null}
            onClick={() => handleStatusUpdate("CANCELLED")}
          >
            {loadingStatus === "CANCELLED" && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}
            Cancel Booking
          </Button>
        </>
      )}
    </div>
  );
}
