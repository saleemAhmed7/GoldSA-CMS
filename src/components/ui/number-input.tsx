"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Input, type InputProps } from "./input";

interface NumberInputProps extends Omit<InputProps, "onChange" | "value"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number | undefined) => void;
  showSteppers?: boolean;
}

export function NumberInput({
  className,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  onChange,
  showSteppers = true,
  disabled,
  ...props
}: NumberInputProps) {
  const [internalVal, setInternalVal] = useState<number | undefined>(
    value !== undefined ? value : defaultValue,
  );

  const currentVal = value !== undefined ? value : internalVal;

  function updateValue(newVal: number | undefined) {
    if (newVal !== undefined) {
      if (min !== undefined && newVal < min) newVal = min;
      if (max !== undefined && newVal > max) newVal = max;
    }
    setInternalVal(newVal);
    onChange?.(newVal);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === "") {
      updateValue(undefined);
      return;
    }
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    }
  }

  function increment() {
    const base = currentVal ?? 0;
    updateValue(base + step);
  }

  function decrement() {
    const base = currentVal ?? 0;
    updateValue(base - step);
  }

  return (
    <div className="relative inline-flex items-center w-full">
      <Input
        type="number"
        min={min}
        max={max}
        step={step}
        value={currentVal !== undefined ? currentVal : ""}
        onChange={handleInputChange}
        disabled={disabled}
        className={cn(showSteppers && "pr-12", className)}
        {...props}
      />
      {showSteppers && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 border-l border-border pl-1">
          <button
            type="button"
            disabled={disabled || (max !== undefined && currentVal !== undefined && currentVal >= max)}
            onClick={increment}
            aria-label="Increment value"
            className="px-1 text-muted hover:text-brand-gold-polished disabled:opacity-30 focus:outline-none"
          >
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            disabled={disabled || (min !== undefined && currentVal !== undefined && currentVal <= min)}
            onClick={decrement}
            aria-label="Decrement value"
            className="px-1 text-muted hover:text-brand-gold-polished disabled:opacity-30 focus:outline-none"
          >
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export type { NumberInputProps };
