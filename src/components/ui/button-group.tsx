import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonGroupVariant = "segmented" | "toolbar" | "inline" | "vertical";
type ButtonGroupSize = "sm" | "md" | "lg";

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  children: ReactNode;
  ariaLabel?: string;
}

export function ButtonGroup({
  className,
  variant = "segmented",
  size: _size = "md",
  children,
  ariaLabel = "Action group",
  ...props
}: ButtonGroupProps) {
  const isVertical = variant === "vertical";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row",
        variant === "segmented" &&
          "rounded-sm border border-border bg-surface p-0.5 shadow-flat [&>button]:rounded-none [&>button:first-child]:rounded-l-sm [&>button:last-child]:rounded-r-sm",
        variant === "toolbar" && "gap-2 flex-wrap items-center",
        variant === "inline" && "gap-1 items-center",
        isVertical &&
          "&>button:first-child]:rounded-t-sm [&>button:last-child]:rounded-b-sm [&>button]:rounded-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type { ButtonGroupProps, ButtonGroupSize, ButtonGroupVariant };
