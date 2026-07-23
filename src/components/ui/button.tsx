import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text"
  | "danger"
  | "success"
  | "soft"
  | "link";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isSelected?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const baseButtonStyles =
  "inline-flex shrink-0 items-center justify-center rounded-sm border font-semibold tracking-action transition-all duration-standard ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:border-brand-gold-polished aria-pressed:bg-accent-subtle";

const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-brand-gold-polished bg-brand-gold-polished text-brand-obsidian shadow-low hover:bg-brand-gold-muted active:scale-[0.98]",
  secondary:
    "border-brand-gold-muted bg-transparent text-brand-gold-muted hover:border-brand-gold-polished hover:text-brand-gold-polished hover:bg-accent-subtle active:scale-[0.98]",
  outline:
    "border-border bg-transparent text-foreground hover:border-brand-gold-polished hover:text-brand-gold-polished hover:bg-accent-subtle active:scale-[0.98]",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-accent-subtle hover:text-brand-gold-polished active:scale-[0.98]",
  text:
    "border-transparent bg-transparent text-brand-gold-muted hover:text-brand-gold-polished active:scale-[0.98]",
  danger:
    "border-semantic-error bg-transparent text-semantic-error hover:bg-semantic-error hover:text-brand-off-white active:scale-[0.98]",
  success:
    "border-semantic-success bg-transparent text-semantic-success hover:bg-semantic-success hover:text-brand-obsidian active:scale-[0.98]",
  soft:
    "border-transparent bg-accent-subtle text-brand-gold-polished hover:border-brand-gold-muted active:scale-[0.98]",
  link:
    "border-transparent bg-transparent p-0 text-brand-gold-muted underline-offset-[var(--spacing-layout-1)] hover:text-brand-gold-polished hover:underline",
};

const buttonSizeStyles: Record<ButtonSize, string> = {
  xs: "min-h-[calc(var(--spacing-layout-4)+var(--spacing-layout-4))] gap-layout-2 px-layout-3 text-action-button",
  sm: "min-h-[calc(var(--spacing-layout-4)+var(--spacing-layout-4))] gap-layout-2 px-layout-3 text-action-button",
  md: "min-h-[calc(var(--spacing-layout-6)+var(--spacing-layout-4)+var(--spacing-layout-1))] gap-layout-2 px-layout-4 text-action-button",
  lg: "min-h-[calc(var(--spacing-layout-8)+var(--spacing-layout-6))] gap-layout-3 px-layout-6 text-action-button",
  xl: "min-h-[calc(var(--spacing-layout-8)+var(--spacing-layout-6))] gap-layout-3 px-layout-8 text-action-button",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  isSelected = false,
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        baseButtonStyles,
        buttonVariantStyles[variant],
        variant !== "link" && buttonSizeStyles[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-pressed={isSelected || undefined}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="size-layout-4 animate-spin rounded-full border border-current border-t-transparent"
        />
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
      {!isLoading ? trailingIcon : null}
    </button>
  );
}

export type { ButtonProps, ButtonSize, ButtonVariant };
