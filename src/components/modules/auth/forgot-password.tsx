"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authService } from "@/services/auth.service";
import { getApiErrorMessage } from "@/lib/api-error";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const result = await authService.forgotPassword({
        email,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setSubmitted(true);

      toast.success(
        "If an account exists with this email, reset instructions have been sent.",
      );
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Unable to create your account. Please try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="size-5" />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Check your email
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          If an account is associated with{" "}
          <span className="font-medium text-foreground">{email}</span>,
          we&apos;ve sent instructions to reset your password.
        </p>

        <p className="mt-3 text-sm text-muted-foreground">
          Don&apos;t see it? Check your spam or junk folder.
        </p>

        <Link
          href="/auth/login"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Forgot your password?
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter the email associated with your Bookora account and we&apos;ll
          help you get back in.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <Button type="submit" className="h-11 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending instructions...
            </>
          ) : (
            "Send reset instructions"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
