import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Account</h1>

        <p className="mt-1 text-muted-foreground">
          Manage your bookings and account information.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="transition-shadow hover:shadow-sm">
          <CardHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="size-5 text-primary" />
            </div>

            <CardTitle>My Bookings</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              View your upcoming and previous bookings.
            </p>

            <Button asChild>
              <Link href="/me/bookings">
                View Bookings
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-sm">
          <CardHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <UserRound className="size-5 text-primary" />
            </div>

            <CardTitle>Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              View and manage your account information.
            </p>

            <Button asChild variant="outline">
              <Link href="/me/profile">
                View Profile
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
