import { UserRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getMyProfile } from "@/services/auth/auth.server.service";
import { ProfileForm } from "@/components/modules/me/profile/ProfileForm";

export default async function ProfilePage() {
  const response = await getMyProfile();

  const profile = response.data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <UserRound className="size-6" />
          My Profile
        </h1>

        <p className="text-muted-foreground">
          View and manage your personal information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>

        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
