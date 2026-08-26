import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Sparkles,
    title: "Simple by design",
    description:
      "We keep the booking experience straightforward so you can focus on what matters instead of dealing with unnecessary complexity.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable experience",
    description:
      "From finding an available time slot to managing your booking, Bookora is designed to keep everything organized.",
  },
  {
    icon: Heart,
    title: "Built for people",
    description:
      "We believe booking a room should feel convenient, clear, and accessible to everyone.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-muted-foreground">
              ABOUT BOOKORA
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Making room booking simple
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Bookora is a room booking platform designed to make discovering
              spaces, choosing available time slots, and managing bookings
              easier.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              OUR APPROACH
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              A better way to manage your bookings
            </h2>

            <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
              <p>
                Finding and booking a suitable room should not require a
                complicated process. Bookora brings venues, rooms, schedules,
                bookings, and payments together in one place.
              </p>

              <p>
                Whether you are looking for a room for a meeting, an activity,
                or another purpose, you can explore available spaces and choose
                a time that works for you.
              </p>

              <p>
                Our goal is simple: provide a clear and reliable booking
                experience from the moment you start searching until your
                booking is completed.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-muted/20 p-8 sm:p-10">
            <div className="flex size-12 items-center justify-center rounded-xl bg-background shadow-sm">
              <CalendarCheck className="size-6" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Everything in one place
            </h3>

            <p className="mt-3 leading-7 text-muted-foreground">
              Browse venues, discover rooms, select available time slots, create
              bookings, make secure payments, and manage your bookings from your
              account.
            </p>

            <Button className="mt-6" asChild>
              <Link href="/venues">
                Explore venues
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y bg-muted/20 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-muted-foreground">
              WHAT WE VALUE
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Designed around a better experience
            </h2>

            <p className="mt-4 text-muted-foreground">
              Bookora focuses on keeping the entire booking journey clear and
              convenient.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Find your next room
          </h2>

          <p className="mt-4 text-muted-foreground">
            Explore available venues and rooms and start your next booking.
          </p>

          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/venues">
                Explore venues
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
