"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type CheckboxVariant = "standard" | "indeterminate" | "card";
type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  indeterminate?: boolean;
  label?: ReactNode;
  description?: ReactNode;
}

const checkboxSizeStyles: Record<CheckboxSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function Checkbox({
  className,
  variant = "standard",
  size = "md",
  indeterminate = false,
  label,
  description,
  disabled,
  checked,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate || variant === "indeterminate");
    }
  }, [indeterminate, variant]);

  const isCard = variant === "card";

  return (
    <label
      className={cn(
        "inline-flex items-start gap-3 cursor-pointer select-none",
        isCard && "w-full p-4 rounded-sm border border-border bg-surface hover:border-brand-gold-muted transition-colors",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      <div className="relative flex items-center justify-center pt-0.5">
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className={cn(
            "peer appearance-none rounded-sm border border-border bg-background transition-colors duration-standard checked:border-brand-gold-polished checked:bg-brand-gold-polished focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            checkboxSizeStyles[size],
          )}
          {...props}
        />
        <svg
          className={cn(
            "pointer-events-none absolute hidden peer-checked:block text-brand-obsidian stroke-current stroke-2 fill-none",
            checkboxSizeStyles[size],
          )}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-body-default font-medium text-foreground">{label}</span>}
          {description && <span className="text-body-small text-muted">{description}</span>}
        </div>
      )}
    </label>
  );
}

export type { CheckboxProps, CheckboxSize, CheckboxVariant };
