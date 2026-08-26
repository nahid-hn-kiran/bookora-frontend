"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { IAdmin } from "@/types/admin.types";

interface AdminsTableProps {
  admins: IAdmin[];
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function getRoleLabel(role: string) {
  if (role === "SUPER_ADMIN") {
    return "Super Admin";
  }

  return "Admin";
}

export function AdminsTable({ admins }: AdminsTableProps) {
  if (admins.length === 0) {
    return (
      <div className="rounded-lg border py-12 text-center">
        <p className="text-muted-foreground">No admins found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="px-4 py-3 font-medium">Admin</th>

            <th className="px-4 py-3 font-medium">Email</th>

            <th className="px-4 py-3 font-medium">Role</th>

            <th className="px-4 py-3 font-medium">Status</th>

            <th className="px-4 py-3 font-medium">Joined</th>

            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b last:border-0">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {admin.user.photo ? (
                    <img
                      src={admin.user.photo}
                      alt={admin.user.name}
                      className="size-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium">
                      {admin.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <p className="font-medium">{admin.user.name}</p>
                </div>
              </td>

              <td className="px-4 py-4">{admin.user.email}</td>

              <td className="px-4 py-4">{getRoleLabel(admin.user.role)}</td>

              <td className="px-4 py-4">
                <span
                  className={
                    admin.user.status === "ACTIVE"
                      ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                      : "rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
                  }
                >
                  {admin.user.status}
                </span>
              </td>

              <td className="px-4 py-4">{formatDate(admin.createdAt)}</td>

              <td className="px-4 py-4 text-right">
                <Button asChild variant="ghost" size="icon">
                  <Link href={`/dashboard/admins/${admin.id}`}>
                    <Eye className="size-4" />

                    <span className="sr-only">View admin</span>
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
