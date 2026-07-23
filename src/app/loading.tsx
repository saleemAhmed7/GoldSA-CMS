export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-layout-6 py-layout-16 text-foreground">
      <div className="w-full max-w-[400px]" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading</span>
        <div className="skeleton h-2 w-24" />
        <div className="skeleton mt-layout-4 h-4 w-full" />
        <div className="skeleton mt-layout-3 h-4 w-5/6" />
      </div>
    </main>
  );
}
