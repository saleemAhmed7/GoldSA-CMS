import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputVariant = "standard" | "filled" | "underline" | "search" | "required";
type InputSize = "xs" | "sm" | "md" | "lg" | "xl";
type InputStatus = "default" | "error" | "warning" | "success";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  status?: InputStatus;
}

const baseInputStyles =
  "w-full bg-transparent font-interface text-body-default text-foreground transition-colors duration-standard ease-out-quart placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 read-only:cursor-default";

const inputVariantStyles: Record<InputVariant, string> = {
  standard:
    "rounded-sm border border-border bg-background px-layout-4 hover:border-brand-gold-muted focus-visible:border-brand-gold-polished focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  filled:
    "rounded-sm border border-transparent bg-surface px-layout-4 hover:border-brand-gold-muted focus-visible:border-brand-gold-polished focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  underline:
    "rounded-flat border-0 border-b border-border px-layout-1 hover:border-brand-gold-muted focus-visible:border-brand-gold-polished focus-visible:ring-0",
  search:
    "rounded-sm border border-border bg-background px-layout-4 hover:border-brand-gold-muted focus-visible:border-brand-gold-polished focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  required:
    "rounded-sm border border-border bg-background px-layout-4 hover:border-brand-gold-muted focus-visible:border-brand-gold-polished focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
};

const inputSizeStyles: Record<InputSize, string> = {
  xs: "min-h-[calc(var(--spacing-layout-4)+var(--spacing-layout-4))]",
  sm: "min-h-[calc(var(--spacing-layout-4)+var(--spacing-layout-4))]",
  md: "min-h-[calc(var(--spacing-layout-6)+var(--spacing-layout-4)+var(--spacing-layout-1))]",
  lg: "min-h-[calc(var(--spacing-layout-8)+var(--spacing-layout-6))]",
  xl: "min-h-[calc(var(--spacing-layout-8)+var(--spacing-layout-6))]",
};

const inputStatusStyles: Record<InputStatus, string> = {
  default: "",
  error: "border-semantic-error focus-visible:border-semantic-error focus-visible:ring-semantic-error",
  warning: "border-semantic-warning focus-visible:border-semantic-warning focus-visible:ring-semantic-warning",
  success: "border-semantic-success focus-visible:border-semantic-success focus-visible:ring-semantic-success",
};

export function Input({
  className,
  variant = "standard",
  size = "md",
  status = "default",
  type,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  const resolvedType = type ?? (variant === "search" ? "search" : "text");
  const isRequired = required || variant === "required";
  const isInvalid = ariaInvalid ?? (status === "error" ? true : undefined);

  return (
    <input
      type={resolvedType}
      className={cn(
        baseInputStyles,
        inputVariantStyles[variant],
        inputSizeStyles[size],
        inputStatusStyles[status],
        className,
      )}
      required={isRequired}
      aria-invalid={isInvalid}
      {...props}
    />
  );
}

export type { InputProps, InputSize, InputStatus, InputVariant };
