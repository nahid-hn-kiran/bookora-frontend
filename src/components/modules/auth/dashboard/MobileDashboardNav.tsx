"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { DashboardNav } from "./DashboardNav";

import type { UserRole } from "@/types/dashboard.types";

interface MobileDashboardNavProps {
  role: UserRole;
}

export function MobileDashboardNav({ role }: MobileDashboardNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-9 items-center justify-center rounded-lg border bg-background hover:bg-accent lg:hidden"
        aria-label="Open dashboard navigation"
      >
        <Menu className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close dashboard navigation"
          />

          <aside className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col border-r bg-background shadow-xl">
            <div className="flex h-16 items-center justify-between border-b px-5">
              <span className="text-xl font-bold tracking-tight">Bookora</span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-accent"
                aria-label="Close dashboard navigation"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4"
              onClick={() => setOpen(false)}
            >
              <DashboardNav role={role} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
