import { Footer } from "@/components/layout/common/Footer";
import { Navbar } from "@/components/layout/common/Navbar";
import { getCurrentUser } from "@/lib/auth";
import type { ReactNode } from "react";

interface CommonLayoutProps {
  children: ReactNode;
}

export default async function CommonLayout({ children }: CommonLayoutProps) {
  const user = await getCurrentUser();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar user={user} />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
