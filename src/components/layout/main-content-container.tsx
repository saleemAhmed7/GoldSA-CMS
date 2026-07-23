import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MainContentContainerProps {
  children: ReactNode;
  className?: string;
}

export function MainContentContainer({ children, className }: MainContentContainerProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "mx-auto min-h-[calc(100dvh-var(--spacing-layout-12)-var(--spacing-layout-4))] w-full max-w-[calc(var(--spacing-layout-16)*20)] px-layout-4 py-layout-6 sm:px-layout-6 lg:px-layout-8 lg:py-layout-8",
        className,
      )}
    >
      {children}
    </main>
  );
}

export type { MainContentContainerProps };
