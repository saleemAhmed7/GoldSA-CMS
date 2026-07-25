"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SegmentedControlVariant = "horizontal" | "vertical" | "icon-label" | "pill";
type SegmentedControlSize = "sm" | "md" | "lg";

interface SegmentOption<T extends string = string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value?: T;
  onChange?: (val: T) => void;
  variant?: SegmentedControlVariant;
  size?: SegmentedControlSize;
  className?: string;
  ariaLabel?: string;
}

const segmentedSizeStyles: Record<SegmentedControlSize, string> = {
  sm: "min-h-8 text-body-small px-3.5 py-1",
  md: "min-h-10 text-body-default px-4 py-1.5",
  lg: "min-h-12 text-body-default px-5 py-2",
};

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  variant = "horizontal",
  size = "md",
  className,
  ariaLabel = "Segmented choices",
}: SegmentedControlProps<T>) {
  const isVertical = variant === "vertical";
  const isPill = variant === "pill";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex max-w-full overflow-x-auto p-1 bg-surface border border-border rounded-sm shadow-flat gap-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-wrap sm:flex-nowrap",
        isVertical ? "flex-col" : "flex-row",
        isPill && "rounded-full",
        className,
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={opt.disabled}
            onClick={() => onChange?.(opt.value)}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap shrink-0 transition-all duration-standard ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-40 disabled:pointer-events-none",
              isPill ? "rounded-full" : "rounded-sm",
              segmentedSizeStyles[size],
              isSelected
                ? "bg-brand-gold-polished text-brand-obsidian shadow-low font-semibold"
                : "text-muted hover:text-foreground hover:bg-accent-subtle",
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type { SegmentedControlProps, SegmentedControlSize, SegmentedControlVariant, SegmentOption };
