"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id?: string;
  variant?: ToastVariant;
  title?: ReactNode;
  message?: ReactNode;
  durationMs?: number;
  onClose?: () => void;
  className?: string;
}

const toastVariantStyles: Record<ToastVariant, string> = {
  success: "border-semantic-success/40 bg-surface text-foreground border-l-4 border-l-semantic-success",
  error: "border-semantic-error/40 bg-surface text-foreground border-l-4 border-l-semantic-error",
  warning: "border-semantic-warning/40 bg-surface text-foreground border-l-4 border-l-semantic-warning",
  info: "border-semantic-info/40 bg-surface text-foreground border-l-4 border-l-semantic-info",
};

export function Toast({
  variant = "info",
  title,
  message,
  durationMs = 4000,
  onClose,
  className,
}: ToastProps) {
  useEffect(() => {
    if (durationMs <= 0 || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex w-full max-w-sm items-start justify-between gap-3 rounded-sm border p-4 shadow-high animate-in slide-in-from-bottom-5 duration-standard",
        toastVariantStyles[variant],
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        {title && <h5 className="font-semibold text-body-default leading-none">{title}</h5>}
        {message && <p className="text-body-small text-muted">{message}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-muted hover:text-foreground"
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  );
}


