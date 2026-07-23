"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-layout-6 py-layout-16 text-foreground">
      <section className="w-full max-w-[600px] rounded-md border border-border bg-surface p-layout-8 shadow-high" role="alert">
        <p className="text-xs font-medium uppercase tracking-[0.05em] text-accent">
          System error
        </p>
        <h1 className="mt-layout-4">Something went wrong.</h1>
        <p className="mt-layout-3 text-sm leading-[1.5] text-muted">
          {error.message || "An unexpected runtime issue interrupted the request."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-layout-6 inline-flex min-h-11 items-center rounded-sm border border-accent px-layout-4 text-sm font-semibold tracking-[0.03em] text-accent transition-colors duration-standard ease-out-quart hover:bg-accent-subtle"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
