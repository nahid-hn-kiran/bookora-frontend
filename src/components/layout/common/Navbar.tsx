"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { IUser } from "@/types/auth.types";
import { authService } from "@/services/auth.service";

interface NavbarProps {
  user: IUser | null;
}

const navigation = [
  {
    label: "Venues",
    href: "/venues",
  },
  {
    label: "Rooms",
    href: "/rooms",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const isUser = user?.role === "USER";

  const isActive = (href: string) => {
    if (href === "/venues") {
      return pathname === "/venues" || pathname.startsWith("/venues/");
    }

    if (href === "/rooms") {
      return pathname === "/rooms" || pathname.startsWith("/rooms/");
    }

    return pathname === href;
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      await authService.logoutUser();

      toast.success("Logged out successfully.");

      closeMobileMenu();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={closeMobileMenu}
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalendarDays className="size-5" />
          </div>

          <span className="text-xl font-bold tracking-tight">Bookora</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Admin dashboard */}
          {isAdmin && (
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {!user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          ) : (
            <>
              {/* User actions */}
              {isUser && (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/me/bookings">My Bookings</Link>
                  </Button>

                  <Button variant="outline" size="icon" asChild>
                    <Link href="/me" aria-label="My Account">
                      <UserRound className="size-4" />
                    </Link>
                  </Button>
                </>
              )}

              {/* Admin account */}
              {isAdmin && (
                <Button variant="outline" size="icon" asChild>
                  <Link href="/dashboard" aria-label="Dashboard">
                    <LayoutDashboard className="size-4" />
                  </Link>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Logout"
              >
                <LogOut className="size-4" />
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((previous) => !previous)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {/* Main navigation */}
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Admin dashboard */}
            {isAdmin && (
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
            )}

            <div className="mt-3 space-y-2 border-t pt-3">
              {!user ? (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login" onClick={closeMobileMenu}>
                      Login
                    </Link>
                  </Button>

                  <Button className="w-full" asChild>
                    <Link href="/register" onClick={closeMobileMenu}>
                      Get Started
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  {isUser && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/me/bookings" onClick={closeMobileMenu}>
                          <CalendarDays className="mr-2 size-4" />
                          My Bookings
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href="/me" onClick={closeMobileMenu}>
                          <UserRound className="mr-2 size-4" />
                          My Account
                        </Link>
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="mr-2 size-4" />

                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
