import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { UsersTable } from "@/components/modules/auth/dashboard/users/UsersTable";

import type { UserStatus } from "@/types/auth.types";
import { getAllUsers } from "@/services/admin/admin.service";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);

  const limit = Math.min(Math.max(Number(params.limit) || 10, 1), 100);

  const search = params.search?.trim() || undefined;

  const status =
    params.status && ["ACTIVE", "DELETED", "BLOCKED"].includes(params.status)
      ? (params.status as UserStatus)
      : undefined;

  const response = await getAllUsers({
    page,
    limit,
    search,
    status,
  });

  const users = response.data ?? [];

  const meta = {
    page: response.meta?.page ?? page,
    limit: response.meta?.limit ?? limit,
    total: response.meta?.total ?? 0,
    totalPage: response.meta?.totalPage ?? 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Users className="size-6" />
          Users
        </h1>

        <p className="text-muted-foreground">
          Manage registered users and their account status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({meta.total})</CardTitle>
        </CardHeader>

        <CardContent>
          <UsersTable
            users={users}
            meta={meta}
            search={search}
            status={status}
          />
        </CardContent>
      </Card>
    </div>
  );
}
