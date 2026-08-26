import { ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAdmins } from "@/services/admin/admin.service";
import { AdminsTable } from "@/components/modules/auth/dashboard/admins/AdminsTable";

export default async function AdminsPage() {
  const response = await getAllAdmins();
  console.log("response", response);

  const admins = response.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <ShieldCheck className="size-6" />
          Admins
        </h1>

        <p className="text-muted-foreground">
          Manage administrators and their account status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Admins ({admins.length})</CardTitle>
        </CardHeader>

        <CardContent>
          <AdminsTable admins={admins} />
        </CardContent>
      </Card>
    </div>
  );
}
