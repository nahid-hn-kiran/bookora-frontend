import { DashboardSidebar } from "@/components/modules/auth/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/modules/auth/dashboard/DashsboardHeader";
import { getCurrentUser } from "@/lib/auth";

import type { IDashboardUser } from "@/types/dashboard.types";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user?.data) {
    return null;
  }

  const dashboardUser: IDashboardUser = {
    id: user.data.id,
    name: user.data.name,
    email: user.data.email,
    role: user.data.role,
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar role={dashboardUser.role} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader user={dashboardUser} />

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
