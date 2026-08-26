import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerBookings } from "@/components/modules/bookings/CustomerBookings";
import { bookingServerService } from "@/services/bookings/booking.server.service";

export default async function BookingsPage() {
  const response = await bookingServerService.getMyBookings();

  const bookings = response.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <CalendarDays className="size-6" />
          My Bookings
        </h1>

        <p className="text-muted-foreground">View and manage your bookings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Bookings ({bookings.length})</CardTitle>
        </CardHeader>

        <CardContent>
          <CustomerBookings bookings={bookings} />
        </CardContent>
      </Card>
    </div>
  );
}
