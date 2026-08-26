import Link from "next/link";
import { ArrowLeft, Mail, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { UserStatusBadge } from "@/components/modules/auth/dashboard/users/UserStatusBadge";
import { UserActions } from "@/components/modules/auth/dashboard/users/UserActions";
import { getUserById } from "@/services/admin/admin.service";

interface UserDetailsPageProps {
  params: Promise<{
    userId: string;
  }>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { userId } = await params;

  console.log(userId);
  const response = await getUserById(userId);

  console.log("response", response);

  const user = response.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard/users">
            <ArrowLeft className="size-5" />
            <span className="sr-only">Back to users</span>
          </Link>
        </Button>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            User Details
          </h1>

          <p className="text-muted-foreground">
            View and manage this user&apos;s account.
          </p>
        </div>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="size-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-24 items-center justify-center rounded-full bg-muted text-3xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4" />
                {user.email}
              </div>

              <div className="flex items-center gap-2">
                <UserRound className="size-4 text-muted-foreground" />

                <span className="text-sm">{user.role}</span>

                <UserStatusBadge status={user.status} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="mt-1 break-all text-sm font-medium">{user.id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-1">
                <UserStatusBadge status={user.status} />
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>

        <CardContent>
          <UserActions user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
