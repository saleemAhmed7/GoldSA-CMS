import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonVariant = "standard" | "ghost" | "outline" | "circular" | "toggle" | "danger";
type IconButtonSize = "xs" | "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  isSelected?: boolean;
  icon?: ReactNode;
}

const baseIconButtonStyles =
  "inline-flex shrink-0 items-center justify-center border font-semibold transition-all duration-standard ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:border-brand-gold-polished aria-pressed:bg-accent-subtle";

const iconButtonVariantStyles: Record<IconButtonVariant, string> = {
  standard:
    "rounded-sm border-border bg-surface text-foreground hover:border-brand-gold-muted hover:text-brand-gold-polished active:scale-[0.95]",
  ghost:
    "rounded-sm border-transparent bg-transparent text-foreground hover:bg-accent-subtle hover:text-brand-gold-polished active:scale-[0.95]",
  outline:
    "rounded-sm border-border bg-transparent text-foreground hover:border-brand-gold-polished hover:text-brand-gold-polished hover:bg-accent-subtle active:scale-[0.95]",
  circular:
    "rounded-full border-border bg-surface text-foreground hover:border-brand-gold-polished hover:text-brand-gold-polished hover:bg-accent-subtle active:scale-[0.95]",
  toggle:
    "rounded-sm border-border bg-transparent text-muted hover:text-foreground aria-pressed:text-brand-gold-polished aria-pressed:border-brand-gold-polished active:scale-[0.95]",
  danger:
    "rounded-sm border-semantic-error bg-transparent text-semantic-error hover:bg-semantic-error hover:text-brand-off-white active:scale-[0.95]",
};

const iconButtonSizeStyles: Record<IconButtonSize, string> = {
  xs: "size-8 text-xs p-1",
  sm: "size-9 text-sm p-1.5",
  md: "size-11 text-base p-2",
  lg: "size-12 text-lg p-2.5",
};

export function IconButton({
  className,
  variant = "standard",
  size = "md",
  isLoading = false,
  isSelected = false,
  icon,
  children,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseIconButtonStyles,
        iconButtonVariantStyles[variant],
        iconButtonSizeStyles[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
      aria-pressed={variant === "toggle" || isSelected ? isSelected : undefined}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon || children
      )}
    </button>
  );
}

export type { IconButtonProps, IconButtonSize, IconButtonVariant };
