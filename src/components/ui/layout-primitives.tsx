import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

// Container
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const containerWidths = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-[1280px]", // 1280px standard storefront
  full: "max-w-full",
};

export function Container({ size = "xl", className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", containerWidths[size], className)} {...props}>
      {children}
    </div>
  );
}

// SectionLayout
export function SectionLayout({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-24", className)} {...props}>
      {children}
    </section>
  );
}

// Stack
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
}

const gapStyles = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Stack({ direction = "col", gap = "md", className, children, ...props }: StackProps) {
  return (
    <div
      className={cn("flex", direction === "row" ? "flex-row items-center" : "flex-col", gapStyles[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// GridLayout
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
}

const colsStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-12",
};

export function GridLayout({ cols = 3, gap = "md", className, children, ...props }: GridProps) {
  return (
    <div className={cn("grid", colsStyles[cols], gapStyles[gap], className)} {...props}>
      {children}
    </div>
  );
}

// FlexLayout
export function FlexLayout({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)} {...props}>
      {children}
    </div>
  );
}

// Spacer
export function Spacer({ size = "md", className }: { size?: "xs" | "sm" | "md" | "lg" | "xl"; className?: string }) {
  const spacerHeights = {
    xs: "h-2",
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
  };
  return <div aria-hidden="true" className={cn("w-full select-none", spacerHeights[size], className)} />;
}

// AspectRatio
export function AspectRatio({
  ratio = "1/1",
  className,
  children,
}: {
  ratio?: "1/1" | "16/9" | "4/3" | "3/4";
  className?: string;
  children: ReactNode;
}) {
  const map = {
    "1/1": "aspect-square",
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
  };

  return <div className={cn("relative w-full overflow-hidden", map[ratio], className)}>{children}</div>;
}

// ScrollArea
export function ScrollArea({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("overflow-auto max-h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

// StickyArea
export function StickyArea({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sticky top-0 z-sticky-header bg-background/80 backdrop-blur-md", className)} {...props}>
      {children}
    </div>
  );
}
