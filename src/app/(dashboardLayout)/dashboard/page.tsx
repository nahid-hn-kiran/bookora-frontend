import { CalendarDays, Clock3, DoorOpen, MapPin } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-primary">Overview</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your Bookora platform and keep track of everything happening
          across your booking system.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Venues"
          value="—"
          description="Venues available on Bookora"
          icon={<MapPin className="size-5" />}
        />

        <DashboardCard
          title="Available Rooms"
          value="—"
          description="Rooms currently available"
          icon={<DoorOpen className="size-5" />}
        />

        <DashboardCard
          title="Total Bookings"
          value="—"
          description="Bookings made through Bookora"
          icon={<CalendarDays className="size-5" />}
        />

        <DashboardCard
          title="Time Slots"
          value="—"
          description="Configured booking slots"
          icon={<Clock3 className="size-5" />}
        />
      </section>

      <section className="rounded-xl border bg-background p-6">
        <div>
          <h2 className="text-lg font-semibold">Recent activity</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest Bookora activity will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function DashboardCard({
  title,
  value,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <div className="rounded-lg bg-muted p-2">{icon}</div>
      </div>

      <p className="mt-5 text-3xl font-semibold">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
