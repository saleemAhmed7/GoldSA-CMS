import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

// Badge
export type BadgeVariant = "neutral" | "success" | "warning" | "error" | "info" | "accent";
export type BadgeSize = "xs" | "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

const badgeVariantStyles: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface text-muted",
  accent: "border-brand-gold-polished/40 bg-accent-subtle text-brand-gold-polished font-semibold",
  success: "border-semantic-success/30 bg-semantic-success/15 text-semantic-success",
  warning: "border-semantic-warning/30 bg-semantic-warning/15 text-semantic-warning",
  error: "border-semantic-error/30 bg-semantic-error/15 text-semantic-error",
  info: "border-semantic-info/30 bg-semantic-info/15 text-semantic-info",
};

const badgeSizeStyles: Record<BadgeSize, string> = {
  xs: "px-1.5 py-0.5 text-[10px] leading-none",
  sm: "px-2 py-0.5 text-label-meta",
  md: "px-2.5 py-1 text-body-small",
};

export function Badge({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-accent border font-interface font-medium uppercase tracking-label",
        badgeVariantStyles[variant],
        badgeSizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Chip
export type ChipVariant = "static" | "action" | "filter" | "removable";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  isSelected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  children: ReactNode;
}

export function Chip({
  className,
  variant = "static",
  isSelected = false,
  onRemove,
  onClick,
  children,
  ...props
}: ChipProps) {
  const isInteractive = variant === "action" || variant === "filter" || Boolean(onClick);

  return (
    <span
      onClick={isInteractive ? onClick : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-body-small text-foreground transition-colors select-none",
        isInteractive && "cursor-pointer hover:border-brand-gold-muted hover:text-brand-gold-polished",
        isSelected && "border-brand-gold-polished bg-accent-subtle text-brand-gold-polished font-medium",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {(variant === "removable" || onRemove) && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="text-muted hover:text-foreground focus:outline-none"
          aria-label="Remove chip"
        >
          ×
        </button>
      )}
    </span>
  );
}

// Tag
export function Tag({ className, variant = "neutral", size = "sm", children, ...props }: BadgeProps) {
  return (
    <Badge variant={variant} size={size} className={cn("rounded-sm tracking-normal capitalize", className)} {...props}>
      {children}
    </Badge>
  );
}
