import Link from "next/link";

import { DashboardNav } from "./DashboardNav";

import type { UserRole } from "@/types/dashboard.types";

interface DashboardSidebarProps {
  role: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">
          Bookora
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <DashboardNav role={role} />
      </div>

      <div className="border-t p-4">
        <p className="px-3 text-xs text-muted-foreground">Bookora Management</p>
      </div>
    </aside>
  );
}
