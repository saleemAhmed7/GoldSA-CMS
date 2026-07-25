"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";

type SliderVariant = "standard" | "range-filled" | "labelled";
type SliderSize = "sm" | "md" | "lg";

interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
  variant?: SliderVariant;
  size?: SliderSize;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const trackSizeStyles: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  variant = "standard",
  size = "md",
  disabled = false,
  label,
  className,
}: SliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(parseFloat(e.target.value));
  }

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {(label || variant === "labelled") && (
        <div className="flex justify-between items-center text-body-small">
          {label && <span className="font-medium text-foreground">{label}</span>}
          <span className="text-muted font-mono">{value}</span>
        </div>
      )}
      <div className="relative flex items-center w-full select-none">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            "w-full appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-gold-polished [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-obsidian [&::-webkit-slider-thumb]:shadow-low",
            trackSizeStyles[size],
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute left-0 rounded-full bg-border -z-10 w-full",
            trackSizeStyles[size],
          )}
        >
          <div
            className="h-full rounded-full bg-brand-gold-polished transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export type { SliderProps, SliderSize, SliderVariant };
