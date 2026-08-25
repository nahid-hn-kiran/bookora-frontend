import { CalendarDays, Clock3, DoorOpen, Building2 } from "lucide-react";

const stats = [
  {
    title: "Total Venues",
    value: "—",
    description: "Your available venues",
    icon: Building2,
  },
  {
    title: "Total Rooms",
    value: "—",
    description: "Rooms across your venues",
    icon: DoorOpen,
  },
  {
    title: "Time Slots",
    value: "—",
    description: "Available booking slots",
    icon: Clock3,
  },
  {
    title: "Bookings",
    value: "—",
    description: "Total bookings",
    icon: CalendarDays,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here&apos;s an overview of your Bookora workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DashboardStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-background p-6">
          <div>
            <h2 className="font-semibold">Recent bookings</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of the latest booking activity.
            </p>
          </div>

          <div className="mt-6 flex min-h-48 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <CalendarDays className="mx-auto size-8 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">No recent bookings</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Recent bookings will appear here.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-background p-6">
          <div>
            <h2 className="font-semibold">Upcoming bookings</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              See what&apos;s coming up next.
            </p>
          </div>

          <div className="mt-6 flex min-h-48 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <Clock3 className="mx-auto size-8 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">No upcoming bookings</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Upcoming bookings will appear here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface DashboardStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-xl border bg-background p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
