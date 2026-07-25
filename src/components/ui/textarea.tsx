import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaVariant = "standard" | "resizable" | "auto-expanding" | "character-limited";
type TextareaSize = "sm" | "md" | "lg";
type TextareaStatus = "default" | "error" | "warning" | "success";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  status?: TextareaStatus;
  maxLength?: number;
  showCharCount?: boolean;
}

const baseTextareaStyles =
  "w-full rounded-sm border border-border bg-background p-layout-3 font-interface text-body-default text-foreground transition-colors duration-standard ease-out-quart placeholder:text-muted focus-visible:border-brand-gold-polished focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40 read-only:cursor-default hover:border-brand-gold-muted";

const textareaSizeStyles: Record<TextareaSize, string> = {
  sm: "min-h-[80px] text-body-small",
  md: "min-h-[120px] text-body-default",
  lg: "min-h-[180px] text-body-default",
};

const textareaStatusStyles: Record<TextareaStatus, string> = {
  default: "",
  error: "border-semantic-error focus-visible:border-semantic-error focus-visible:ring-semantic-error",
  warning: "border-semantic-warning focus-visible:border-semantic-warning focus-visible:ring-semantic-warning",
  success: "border-semantic-success focus-visible:border-semantic-success focus-visible:ring-semantic-success",
};

export function Textarea({
  className,
  variant = "standard",
  size = "md",
  status = "default",
  maxLength,
  showCharCount = false,
  value,
  defaultValue,
  onChange,
  disabled,
  ...props
}: TextareaProps) {
  const currentLength = typeof value === "string" ? value.length : typeof defaultValue === "string" ? defaultValue.length : 0;
  const isResizable = variant === "resizable";

  return (
    <div className="relative w-full">
      <textarea
        className={cn(
          baseTextareaStyles,
          textareaSizeStyles[size],
          textareaStatusStyles[status],
          !isResizable && "resize-none",
          className,
        )}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {(showCharCount || variant === "character-limited") && maxLength ? (
        <div className="mt-1 text-right text-label-meta text-muted">
          {currentLength} / {maxLength}
        </div>
      ) : null}
    </div>
  );
}

export type { TextareaProps, TextareaSize, TextareaStatus, TextareaVariant };
