import { Clock3, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@bookora.com",
    description: "Send us an email and we'll get back to you.",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1XXX-XXXXXX",
    description: "Available during our support hours.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    description: "Our service is currently focused on Bangladesh.",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-medium text-muted-foreground">
            CONTACT US
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            We&apos;re here to help
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Have a question about your booking or need help using Bookora? Get
            in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact information */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5" />
                    </div>

                    <h2 className="mt-5 font-semibold">{item.title}</h2>

                    <p className="mt-2 font-medium">{item.value}</p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Support card */}
          <div className="mt-12 grid gap-8 rounded-2xl border bg-muted/20 p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <div className="flex size-11 items-center justify-center rounded-lg bg-background">
                <MessageSquare className="size-5" />
              </div>

              <h2 className="mt-5 text-2xl font-semibold">
                Need help with a booking?
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                If you have an issue with an existing booking, keep your booking
                number available when contacting our support team. This will
                help us assist you more quickly.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <div className="flex items-center gap-3">
                <Clock3 className="size-5 text-muted-foreground" />

                <div>
                  <p className="font-medium">Support hours</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Saturday - Thursday
                  </p>

                  <p className="text-sm text-muted-foreground">
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <p className="text-sm text-muted-foreground">General support</p>

                <p className="mt-1 font-medium">support@bookora.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
