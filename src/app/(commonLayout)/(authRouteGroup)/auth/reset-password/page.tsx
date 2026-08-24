import { ResetPasswordForm } from "@/components/modules/auth/reset-password-form";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  if (!params.token) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Invalid reset link
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This password reset link is missing or invalid. Please request a new
          one.
        </p>

        <a
          href="/auth/forgot-password"
          className="mt-8 inline-flex text-sm font-medium text-primary hover:underline"
        >
          Request a new reset link
        </a>
      </div>
    );
  }

  return <ResetPasswordForm token={params.token} />;
}
