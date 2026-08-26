"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { paymentService } from "@/services/payment/payment.service";

interface PayBookingButtonProps {
  bookingId: string;
}

export function PayBookingButton({ bookingId }: PayBookingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const response = await paymentService.createCheckoutSession(bookingId);

      const checkoutUrl = response.data?.url;

      if (!checkoutUrl) {
        throw new Error("Unable to create Stripe checkout session.");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to start payment.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className="w-full"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Preparing payment...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 size-4" />
          Pay now
        </>
      )}
    </Button>
  );
}
