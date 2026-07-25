"use client";

import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Button, type ButtonProps, type ButtonSize } from "./button";

type SplitButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface SplitOption {
  id: string;
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface SplitButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  variant?: SplitButtonVariant;
  size?: ButtonSize;
  options: SplitOption[];
  dropdownAriaLabel?: string;
}

export function SplitButton({
  className,
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  options,
  dropdownAriaLabel = "More choices",
  ...props
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-flex rounded-sm shadow-flat", className)}>
      <Button
        variant={variant as ButtonProps["variant"]}
        size={size}
        disabled={disabled}
        onClick={onClick}
        className="rounded-r-none border-r-0"
        {...props}
      >
        {children}
      </Button>
      <Button
        variant={variant as ButtonProps["variant"]}
        size={size}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={dropdownAriaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="rounded-l-none px-2"
      >
        <svg
          className={cn("size-4 transition-transform duration-standard", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-dropdown-menu mt-1 min-w-[160px] rounded-sm border border-border bg-surface p-1 shadow-high animate-in fade-in zoom-in-95"
        >
          {options.map((opt) => (
            <button
              key={opt.id}
              role="menuitem"
              disabled={opt.disabled}
              onClick={() => {
                opt.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left rounded-sm px-3 py-2 text-body-small text-foreground hover:bg-accent-subtle hover:text-brand-gold-polished disabled:opacity-40 disabled:pointer-events-none"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type { SplitButtonProps, SplitButtonVariant, SplitOption };
