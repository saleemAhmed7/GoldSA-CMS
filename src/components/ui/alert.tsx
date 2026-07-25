import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertSize = "sm" | "md" | "lg";

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: ReactNode;
  children?: ReactNode;
  onDismiss?: () => void;
  className?: string;
  icon?: ReactNode;
}

const alertVariantStyles: Record<AlertVariant, string> = {
  info: "border-semantic-info/40 bg-semantic-info/10 text-semantic-info",
  success: "border-semantic-success/40 bg-semantic-success/10 text-semantic-success",
  warning: "border-semantic-warning/40 bg-semantic-warning/10 text-semantic-warning",
  error: "border-semantic-error/40 bg-semantic-error/10 text-semantic-error",
};

export function Alert({
  variant = "info",
  size = "md",
  title,
  children,
  onDismiss,
  className,
  icon,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-sm border p-4 transition-colors",
        alertVariantStyles[variant],
        size === "sm" && "p-2.5 text-body-small",
        size === "lg" && "p-5 text-body-default",
        className,
      )}
    >
      {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
      <div className="flex-1 flex flex-col gap-1">
        {title && <h4 className="font-semibold leading-none">{title}</h4>}
        {children && <div className="text-body-small opacity-90">{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-current opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
}

export interface BannerProps extends AlertProps {
  actionLabel?: string;
  onAction?: () => void;
}

export function Banner({
  variant = "info",
  title,
  children,
  onDismiss,
  actionLabel,
  onAction,
  className,
}: BannerProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 border-b px-6 py-3 text-body-small",
        alertVariantStyles[variant],
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {title && <span className="font-semibold">{title}:</span>}
        <span>{children}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="font-semibold underline underline-offset-2 hover:opacity-80"
          >
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="opacity-70 hover:opacity-100"
            aria-label="Dismiss banner"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}


