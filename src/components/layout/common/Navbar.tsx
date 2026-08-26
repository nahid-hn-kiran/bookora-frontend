"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

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

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/venues") {
      return pathname === "/venues" || pathname.startsWith("/venues/");
    }

    if (href === "/rooms") {
      return pathname === "/rooms" || pathname.startsWith("/rooms/");
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
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
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/bookings">My Bookings</Link>
          </Button>

          <Button asChild>
            <Link href="/profile">My Account</Link>
          </Button>
        </div>

        {/* Mobile button */}
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
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 border-t pt-3">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/bookings" onClick={() => setMobileOpen(false)}>
                  My Bookings
                </Link>
              </Button>

              <Button className="mt-2 w-full" asChild>
                <Link href="/profile" onClick={() => setMobileOpen(false)}>
                  My Account
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
