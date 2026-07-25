import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FABVariant = "circular" | "extended" | "mini";
type FABSize = "md" | "lg";

interface FloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FABVariant;
  size?: FABSize;
  icon?: ReactNode;
  label?: ReactNode;
  isLoading?: boolean;
}

const fabSizeStyles: Record<FABSize, string> = {
  md: "h-12 text-sm px-4 min-w-12",
  lg: "h-14 text-base px-6 min-w-14",
};

export function FloatingActionButton({
  className,
  variant = "circular",
  size = "md",
  icon,
  label,
  isLoading = false,
  disabled,
  children,
  ...props
}: FloatingActionButtonProps) {
  const isCircular = variant === "circular" || variant === "mini";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center font-semibold border border-brand-gold-polished bg-brand-gold-polished text-brand-obsidian shadow-high transition-all duration-standard ease-out-quart hover:bg-brand-gold-muted hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
        isCircular ? "rounded-full aspect-square p-0" : "rounded-full gap-2",
        variant === "mini" && "size-10 min-w-10 text-xs",
        variant !== "mini" && fabSizeStyles[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}
      {!isCircular && (label || children)}
    </button>
  );
}

export type { FloatingActionButtonProps, FABSize, FABVariant };
