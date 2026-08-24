import { DashboardNavLink } from "./DashboardNavLink";

import type { IDashboardNavItem, UserRole } from "@/types/dashboard.types";

const navigation: IDashboardNavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: "layout-dashboard",
  },
  {
    title: "Venues",
    href: "/dashboard/venues",
    icon: "building-2",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Rooms",
    href: "/dashboard/rooms",
    icon: "door-open",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Time Slots",
    href: "/dashboard/time-slots",
    icon: "clock-3",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: "calendar-days",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: "users",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Admins",
    href: "/dashboard/admins",
    icon: "shield-check",
    roles: ["SUPER_ADMIN"],
  },
];

interface DashboardNavProps {
  role: UserRole;
}

export function DashboardNav({ role }: DashboardNavProps) {
  const visibleItems = navigation.filter(
    (item) => !item.roles || item.roles.includes(role),
  );

  return (
    <nav className="space-y-1">
      {visibleItems.map((item) => (
        <DashboardNavLink
          key={item.href}
          href={item.href}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </nav>
  );
}
