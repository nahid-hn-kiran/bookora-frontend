import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold">Welcome back {user?.name}</h1>
    </main>
  );
}
