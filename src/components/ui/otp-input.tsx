"use client";

import type { ClipboardEvent, KeyboardEvent } from "react";
import { useState, useRef } from "react";
import { cn } from "@/lib/cn";

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  className,
}: OTPInputProps) {
  const [internalOtp, setInternalOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpArray = value ? value.split("").slice(0, length) : internalOtp;

  function updateOtp(newOtp: string[]) {
    setInternalOtp(newOtp);
    onChange?.(newOtp.join(""));
  }

  function handleChange(val: string, index: number) {
    if (disabled) return;
    const char = val.slice(-1);
    const updated = [...otpArray];
    updated[index] = char;
    updateOtp(updated);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, length).split("");
    if (!pasted.length) return;

    const updated = [...otpArray];
    pasted.forEach((char, i) => {
      if (i < length) updated[i] = char;
    });
    updateOtp(updated);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otpArray[index] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="size-11 rounded-sm border border-border bg-background text-center font-interface text-header-2 font-medium text-foreground focus-visible:border-brand-gold-polished focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-40"
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
}

export type { OTPInputProps };
