import Link from "next/link";
import { CalendarDays, LayoutDashboard, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

interface MeLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Overview",
    href: "/me",
    icon: LayoutDashboard,
  },
  {
    name: "My Bookings",
    href: "/me/bookings",
    icon: CalendarDays,
  },
  {
    name: "Profile",
    href: "/me/profile",
    icon: UserRound,
  },
];

export default function MeLayout({ children }: MeLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">My Account</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your Bookora account
              </p>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      "text-muted-foreground transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="size-4" />

                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        {/* Mobile navigation */}
        <div className="mb-6 md:hidden">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">My Account</h2>

            <p className="text-sm text-muted-foreground">
              Manage your Bookora account
            </p>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex shrink-0 items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <Icon className="size-4" />

                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
