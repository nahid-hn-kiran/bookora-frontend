import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="size-16 text-green-600" />

          <h1 className="mt-6 text-2xl font-semibold">Payment successful</h1>

          <p className="mt-2 text-muted-foreground">
            Your payment was received. Your booking will be confirmed shortly.
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/me/bookings">My bookings</Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/rooms">Browse rooms</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
