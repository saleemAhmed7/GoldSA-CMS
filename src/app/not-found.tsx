import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-layout-6 py-layout-16 text-foreground">
      <section className="w-full max-w-[600px] rounded-md border border-border bg-surface p-layout-8 shadow-high">
        <p className="text-xs font-medium uppercase tracking-[0.05em] text-accent">
          404
        </p>
        <h1 className="mt-layout-4">Page not found</h1>
        <p className="mt-layout-3 text-sm leading-[1.5] text-muted">
          The requested page could not be located. Please return to the home page or try a different route.
        </p>
        <div className="mt-layout-6 flex flex-wrap gap-layout-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-sm border border-accent px-layout-4 text-sm font-semibold tracking-[0.03em] text-accent transition-colors duration-standard ease-out-quart hover:bg-accent-subtle"
          >
            Go to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
