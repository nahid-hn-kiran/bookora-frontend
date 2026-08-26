import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminById } from "@/services/admin/admin.service";
import { AdminDetails } from "@/components/modules/auth/dashboard/admins/AdminDetails";

interface AdminDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminDetailsPage({
  params,
}: AdminDetailsPageProps) {
  const { id } = await params;

  let response;

  try {
    response = await getAdminById(id);
  } catch {
    notFound();
  }

  console.log("response", response);

  const admin = response.data;

  if (!admin) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <ShieldCheck className="size-6" />
          Admin Details
        </h1>

        <p className="text-muted-foreground">
          View and manage administrator information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{admin.user.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <AdminDetails admin={admin} />
        </CardContent>
      </Card>
    </div>
  );
}
