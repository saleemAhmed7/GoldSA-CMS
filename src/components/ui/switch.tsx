import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwitchVariant = "standard" | "compact" | "label-left" | "label-right";
type SwitchSize = "sm" | "md";

interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  variant?: SwitchVariant;
  size?: SwitchSize;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
}

const switchTrackSizeStyles: Record<SwitchSize, string> = {
  sm: "w-8 h-4",
  md: "w-11 h-6",
};

const switchThumbSizeStyles: Record<SwitchSize, string> = {
  sm: "size-3 translate-x-0.5 aria-checked:translate-x-4.5",
  md: "size-5 translate-x-0.5 aria-checked:translate-x-5.5",
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
  const labelLeft = variant === "label-left";

  function toggle() {
    if (!disabled) onChange?.(!checked);
  }

  const switchElement = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors duration-standard ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
        checked ? "bg-brand-gold-polished" : "bg-border",
        switchTrackSizeStyles[size],
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        aria-checked={checked}
        className={cn(
          "pointer-events-none block rounded-full bg-brand-obsidian shadow-flat transition-transform duration-standard ease-out-quart",
          switchThumbSizeStyles[size],
        )}
      />
    </button>
  );

  if (!label) return switchElement;

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      {labelLeft && <span className="text-body-default font-medium text-foreground">{label}</span>}
      {switchElement}
      {!labelLeft && <span className="text-body-default font-medium text-foreground">{label}</span>}
    </label>
  );
}

export type { SwitchProps, SwitchSize, SwitchVariant };
