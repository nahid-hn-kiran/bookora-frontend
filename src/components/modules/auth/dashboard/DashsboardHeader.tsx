import { UserRound } from "lucide-react";

import { MobileDashboardNav } from "./MobileDashboardNav";

import type { IDashboardUser } from "@/types/dashboard.types";

interface DashboardHeaderProps {
  user: IDashboardUser;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const roleName = user.role.toLowerCase().replace("_", " ");

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <MobileDashboardNav role={user.role} />

        <div>
          <p className="text-sm font-medium">Bookora</p>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Management Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">{user.name}</p>

          <p className="text-xs capitalize text-muted-foreground">{roleName}</p>
        </div>

        <div className="flex size-9 items-center justify-center rounded-full bg-muted">
          <UserRound className="size-4" />
        </div>
      </div>
    </header>
  );
}
