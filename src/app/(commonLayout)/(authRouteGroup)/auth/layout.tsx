import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Brand / visual side */}
        <div className="relative hidden overflow-hidden bg-primary lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.10),transparent_30%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <Link
              href="/"
              className="w-fit text-2xl font-semibold tracking-tight text-primary-foreground"
            >
              Bookora
            </Link>

            <div className="max-w-lg pb-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
                Find your space
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-primary-foreground xl:text-5xl">
                Spaces for meetings, moments and everything in between.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">
                Discover comfortable spaces, choose a convenient time and make
                your booking in just a few steps.
              </p>
            </div>

            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Bookora. All rights reserved.
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </main>
  );
}
