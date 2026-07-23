import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
  helperText?: ReactNode;
}

export function Label({
  className,
  children,
  isRequired = false,
  helperText,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "inline-flex flex-col gap-layout-1 text-label-meta font-medium uppercase tracking-label text-muted",
        className,
      )}
      {...props}
    >
      <span>
        {children}
        {isRequired ? (
          <span aria-hidden="true" className="text-semantic-error">
            *
          </span>
        ) : null}
      </span>
      {helperText ? (
        <span className="normal-case tracking-body-small text-muted">{helperText}</span>
      ) : null}
    </label>
  );
}

export type { LabelProps };
