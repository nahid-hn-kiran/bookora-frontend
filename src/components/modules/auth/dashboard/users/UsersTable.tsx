"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Eye, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserStatusBadge } from "./UserStatusBadge";

import type { IUser } from "@/types/admin.types";
import type { UserStatus } from "@/types/auth.types";

interface UsersTableProps {
  users: IUser[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };

  search?: string;
  status?: UserStatus;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function UsersTable({ users, meta, search, status }: UsersTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearch(value: string) {
    updateParams({
      search: value || null,
      page: "1",
    });
  }

  function handleStatusChange(value: string) {
    updateParams({
      status: value === "ALL" ? null : value,
      page: "1",
    });
  }

  function clearFilters() {
    router.push(pathname);
  }

  function goToPage(page: number) {
    if (page < 1 || page > meta.totalPage) return;

    updateParams({
      page: String(page),
    });
  }

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            defaultValue={search ?? ""}
            placeholder="Search by name or email..."
            className="pl-9"
            onChange={(event) => {
              const value = event.target.value;

              // Small debounce
              const timeout = setTimeout(() => {
                handleSearch(value);
              }, 400);

              return () => clearTimeout(timeout);
            }}
          />
        </div>

        <select
          value={status ?? "ALL"}
          onChange={(event) => handleStatusChange(event.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="ALL">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DELETED">Deleted</option>
          <option value="BLOCKED">Blocked</option>
        </select>

        {(search || status) && (
          <Button type="button" variant="outline" onClick={clearFilters}>
            <X className="mr-2 size-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Results */}
      {users.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-muted-foreground">No users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3 font-medium">User</th>

                <th className="px-4 py-3 font-medium">Email</th>

                <th className="px-4 py-3 font-medium">Status</th>

                <th className="px-4 py-3 font-medium">Joined</th>

                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <p className="font-medium">{user.name}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4">{user.email}</td>

                  <td className="px-4 py-4">
                    <UserStatusBadge status={user.status} />
                  </td>

                  <td className="px-4 py-4">{formatDate(user.createdAt)}</td>

                  <td className="px-4 py-4 text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/dashboard/users/${user.id}`}>
                        <Eye className="size-4" />

                        <span className="sr-only">View user</span>
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {meta.totalPage > 0 && (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing page {meta.page} of {meta.totalPage} ({meta.total} users)
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page <= 1}
              onClick={() => goToPage(meta.page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPage}
              onClick={() => goToPage(meta.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
