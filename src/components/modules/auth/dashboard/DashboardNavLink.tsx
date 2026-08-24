"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  Clock3,
  DoorOpen,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";

type DashboardIcon =
  | "layout-dashboard"
  | "building-2"
  | "door-open"
  | "clock-3"
  | "calendar-days"
  | "users"
  | "shield-check";

interface DashboardNavLinkProps {
  href: string;
  title: string;
  icon: DashboardIcon;
}

const icons = {
  "layout-dashboard": LayoutDashboard,
  "building-2": Building2,
  "door-open": DoorOpen,
  "clock-3": Clock3,
  "calendar-days": CalendarDays,
  users: Users,
  "shield-check": ShieldCheck,
};

export function DashboardNavLink({ href, title, icon }: DashboardNavLinkProps) {
  const pathname = usePathname();

  const Icon = icons[icon];

  const isActive =
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      ].join(" ")}
    >
      <Icon className="size-4 shrink-0" />

      <span>{title}</span>
    </Link>
  );
}
