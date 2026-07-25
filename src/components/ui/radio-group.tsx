"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";
import { cn } from "@/lib/cn";

type RadioVariant = "standard" | "card" | "inline";
type RadioSize = "sm" | "md" | "lg";

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  variant?: RadioVariant;
  size?: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant?: RadioVariant;
  size?: RadioSize;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  disabled = false,
  variant = "standard",
  size = "md",
  children,
  className,
  ariaLabel = "Options",
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, value, onChange, disabled, variant, size }}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn(
          "flex flex-col gap-3",
          variant === "inline" && "flex-row flex-wrap items-center gap-4",
          className,
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
}

const radioSizeStyles: Record<RadioSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function Radio({ className, value, label, description, disabled, ...props }: RadioProps) {
  const ctx = useContext(RadioGroupContext);
  const isChecked = ctx.value === value;
  const isDisabled = disabled || ctx.disabled;
  const variant = ctx.variant || "standard";
  const size = ctx.size || "md";
  const isCard = variant === "card";

  return (
    <label
      className={cn(
        "inline-flex items-start gap-3 cursor-pointer select-none",
        isCard &&
          "w-full p-4 rounded-sm border border-border bg-surface hover:border-brand-gold-muted transition-colors",
        isCard && isChecked && "border-brand-gold-polished bg-accent-subtle",
        isDisabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      <div className="relative flex items-center justify-center pt-0.5">
        <input
          type="radio"
          name={ctx.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => ctx.onChange?.(value)}
          className={cn(
            "peer appearance-none rounded-full border border-border bg-background transition-colors duration-standard checked:border-brand-gold-polished focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            radioSizeStyles[size],
          )}
          {...props}
        />
        <span
          className={cn(
            "pointer-events-none absolute hidden peer-checked:block rounded-full bg-brand-gold-polished",
            size === "sm" && "size-2",
            size === "md" && "size-2.5",
            size === "lg" && "size-3",
          )}
        />
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

export type { RadioGroupProps, RadioProps, RadioSize, RadioVariant };
