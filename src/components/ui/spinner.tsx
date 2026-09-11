import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Spinner
export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerVariant = "circular" | "inline" | "overlay";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  className?: string;
}

const spinnerSizeStyles: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-8 border-3",
  lg: "size-12 border-4",
};

export function Spinner({
  size = "md",
  variant = "circular",
  label = "Loading...",
  className,
}: SpinnerProps) {
  const spinnerElement = (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "animate-spin rounded-full border-brand-gold-polished border-t-transparent",
        spinnerSizeStyles[size],
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  );

  if (variant === "overlay") {
    return (
      <div className="absolute inset-0 z-modal-popup flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs">
        {spinnerElement}
        {label && <span className="mt-2 text-body-small text-muted">{label}</span>}
      </div>
    );
  }

  return spinnerElement;
}

// Skeleton
export type SkeletonVariant = "text" | "image" | "card" | "table-row";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
}

export function Skeleton({ variant = "text", className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton",
        variant === "text" && "h-4 w-full",
        variant === "image" && "aspect-video w-full",
        variant === "card" && "h-48 w-full",
        variant === "table-row" && "h-10 w-full",
        className,
      )}
    />
  );
}

// EmptyState
export interface EmptyStateProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-sm border border-dashed border-border bg-surface",
        className,
      )}
    >
      {icon && <div className="mb-4 text-brand-gold-muted">{icon}</div>}
      <h3 className="text-header-3 font-display font-medium text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-body-small text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

// StatusIndicator
export type StatusType = "neutral" | "success" | "warning" | "error" | "info";

export interface StatusIndicatorProps {
  status?: StatusType;
  label?: ReactNode;
  pulse?: boolean;
  className?: string;
}

const statusDotColors: Record<StatusType, string> = {
  neutral: "bg-muted",
  success: "bg-semantic-success",
  warning: "bg-semantic-warning",
  error: "bg-semantic-error",
  info: "bg-semantic-info",
};

export function StatusIndicator({
  status = "neutral",
  label,
  pulse = false,
  className,
}: StatusIndicatorProps) {
  return (
    <div className={cn("relative z-0 inline-flex items-center gap-2", className)}>
      <span className="relative z-0 flex size-2.5 shrink-0">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-75",
              statusDotColors[status],
            )}
          />
        )}
        <span className={cn("relative inline-flex size-2.5 rounded-full", statusDotColors[status])} />
      </span>
      {label && <span className="text-body-small font-medium text-foreground">{label}</span>}
    </div>
  );
}
