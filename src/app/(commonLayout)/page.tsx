import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CalendarCheck,
    title: "Easy booking",
    description:
      "Find an available room and book your preferred time slot in just a few steps.",
  },
  {
    icon: Clock3,
    title: "Flexible time slots",
    description:
      "Choose from available schedules that fit your plans without unnecessary hassle.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payments",
    description:
      "Complete your booking securely with our integrated Stripe payment system.",
  },
  {
    icon: MapPin,
    title: "Multiple venues",
    description:
      "Explore rooms across different venues and find the right place for your needs.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto grid min-h-[600px] w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
              Simple. Flexible. Reliable.
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Book the right room for your next experience.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Discover comfortable spaces, choose a convenient time slot, and
              make your booking with Bookora.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/venues">
                  Explore venues
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/rooms">Browse rooms</Link>
              </Button>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-3xl border bg-background shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/60 via-background to-muted/20" />

              <div className="absolute inset-8 rounded-2xl border bg-background p-6 shadow-sm">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Bookora</p>
                    <p className="font-semibold">Available rooms</p>
                  </div>

                  <CalendarCheck className="size-5 text-muted-foreground" />
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      name: "Premium Room",
                      time: "10:00 AM - 11:00 AM",
                    },
                    {
                      name: "Meeting Room",
                      time: "12:00 PM - 1:00 PM",
                    },
                    {
                      name: "Studio Room",
                      time: "3:00 PM - 4:00 PM",
                    },
                  ].map((room) => (
                    <div
                      key={room.name}
                      className="rounded-xl border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">{room.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {room.time}
                          </p>
                        </div>

                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                          Available
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-muted-foreground">
              WHY BOOKORA
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Everything you need for a simple booking experience
            </h2>

            <p className="mt-4 text-muted-foreground">
              Bookora makes it easy to discover rooms, find suitable time slots,
              and manage your bookings from one place.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card key={feature.title}>
                  <CardContent className="p-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-5 font-semibold">{feature.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/20 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                HOW IT WORKS
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Book your room in three simple steps
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                No complicated process. Find a venue, choose a room and time
                slot, then complete your booking.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Choose a venue",
                  description:
                    "Explore available venues and find one that suits your needs.",
                },
                {
                  number: "02",
                  title: "Select a room and time",
                  description:
                    "Check the available rooms and select a convenient time slot.",
                },
                {
                  number: "03",
                  title: "Confirm your booking",
                  description:
                    "Review your booking and securely complete the payment.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-xl border bg-background p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-semibold">{step.title}</h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to find your room?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore our venues and rooms and make your next booking with
            Bookora.
          </p>

          <div className="mt-8">
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
