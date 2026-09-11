"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/providers/language-provider";

type SwitchVariant = "standard" | "compact" | "label-left" | "label-right";
type SwitchSize = "sm" | "md";

interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  variant?: SwitchVariant;
  size?: SwitchSize;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
}

const trackSizeStyles: Record<SwitchSize, string> = {
  sm: "h-5 w-9 p-0.5",
  md: "h-6 w-11 p-0.5",
};

const thumbSizeStyles: Record<SwitchSize, string> = {
  sm: "size-4",
  md: "size-5",
};

export function Switch({
  className,
  variant = "standard",
  size = "md",
  checked = false,
  onChange,
  disabled,
  label,
  ...props
}: SwitchProps) {
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";
  const labelLeft = variant === "label-left";

  function toggle() {
    if (!disabled) onChange?.(!checked);
  }

  // Calculate translation distance based on size and layout direction
  let translateClass = "translate-x-0";
  if (checked) {
    if (size === "sm") {
      translateClass = isRtl ? "-translate-x-4" : "translate-x-4";
    } else {
      translateClass = isRtl ? "-translate-x-5" : "translate-x-5";
    }
  }

  const switchElement = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 select-none",
        checked ? "bg-brand-gold-polished" : "bg-border hover:bg-border/80",
        trackSizeStyles[size],
        !label && className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block rounded-full bg-white shadow-medium ring-0 transition-transform duration-200 ease-in-out",
          thumbSizeStyles[size],
          translateClass,
        )}
      />
    </button>
  );

  if (!label) return switchElement;

  return (
    <label
      className={cn(
        "inline-flex items-center justify-between gap-3 cursor-pointer select-none w-full",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      {labelLeft && <span className="text-body-small font-medium text-foreground">{label}</span>}
      {switchElement}
      {!labelLeft && <span className="text-body-small font-medium text-foreground">{label}</span>}
    </label>
  );
}

export type { SwitchProps, SwitchSize, SwitchVariant };
