import type { HTMLAttributes, KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "standard" | "elevated" | "interactive" | "selectable";
type CardSize = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  isSelected?: boolean;
  isDisabled?: boolean;
}

const cardBaseStyles =
  "rounded-sm border bg-surface text-foreground transition-all duration-standard ease-out-quart";

const cardVariantStyles: Record<CardVariant, string> = {
  standard: "border-border shadow-flat",
  elevated: "border-border shadow-medium",
  interactive:
    "border-border shadow-flat hover:border-brand-gold-muted hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  selectable:
    "border-border shadow-flat hover:border-brand-gold-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

const cardSizeStyles: Record<CardSize, string> = {
  sm: "p-layout-4",
  md: "p-layout-6",
  lg: "p-layout-8",
};

export function Card({
  className,
  variant = "standard",
  size = "md",
  isSelected = false,
  isDisabled = false,
  tabIndex,
  role,
  onClick,
  onKeyDown,
  ...props
}: CardProps) {
  const isInteractive = variant === "interactive" || variant === "selectable";

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);

    if (!onClick || event.defaultPrevented) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  return (
    <div
      className={cn(
        cardBaseStyles,
        cardVariantStyles[variant],
        cardSizeStyles[size],
        "overflow-hidden",
        isSelected && "border-brand-gold-polished bg-accent-subtle",
        isDisabled && "pointer-events-none cursor-not-allowed opacity-40",
        className,
      )}
      role={role ?? (isInteractive && onClick ? "button" : undefined)}
      tabIndex={tabIndex ?? (isInteractive && onClick && !isDisabled ? 0 : undefined)}
      aria-disabled={isDisabled || undefined}
      aria-selected={variant === "selectable" ? isSelected : undefined}
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export type { CardProps, CardSize, CardVariant };
