"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Input, type InputProps } from "./input";

type PasswordStrength = "weak" | "medium" | "strong" | "very-strong";

interface PasswordInputProps extends InputProps {
  showStrengthIndicator?: boolean;
}

function calculateStrength(password: string): PasswordStrength | null {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return "weak";
  if (score === 2) return "medium";
  if (score === 3) return "strong";
  return "very-strong";
}

const strengthColors: Record<PasswordStrength, string> = {
  weak: "bg-semantic-error w-1/4",
  medium: "bg-semantic-warning w-2/4",
  strong: "bg-semantic-info w-3/4",
  "very-strong": "bg-semantic-success w-full",
};

export function PasswordInput({
  className,
  showStrengthIndicator = false,
  value,
  defaultValue,
  onChange,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    (value as string) || (defaultValue as string) || "",
  );

  const pwd = (value as string) !== undefined ? (value as string) : internalValue;
  const strength = showStrengthIndicator ? calculateStrength(pwd) : null;

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange?.(e);
          }}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-brand-gold-polished focus-visible:outline-none"
        >
          {showPassword ? (
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-7-11-7a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 7 11 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M3 3l18 18" />
            </svg>
          ) : (
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {strength && (
        <div className="mt-1.5 flex flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div className={cn("h-full transition-all duration-standard", strengthColors[strength])} />
          </div>
          <span className="text-label-meta capitalize text-muted">{strength.replace("-", " ")} password</span>
        </div>
      )}
    </div>
  );
}

export type { PasswordInputProps, PasswordStrength };
