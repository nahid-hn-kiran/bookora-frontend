import { Badge } from "@/components/ui/badge";

import type { BookingStatus } from "@/types/booking.types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const statusConfig: Record<
    BookingStatus,
    {
      label: string;
      className: string;
    }
  > = {
    PENDING: {
      label: "Pending",
      className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700",
    },

    CONFIRMED: {
      label: "Confirmed",
      className: "border-green-500/30 bg-green-500/10 text-green-700",
    },

    CANCELLED: {
      label: "Cancelled",
      className: "border-red-500/30 bg-red-500/10 text-red-700",
    },

    COMPLETED: {
      label: "Completed",
      className: "border-blue-500/30 bg-blue-500/10 text-blue-700",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
