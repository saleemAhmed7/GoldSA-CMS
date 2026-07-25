"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  status?: "default" | "error" | "warning" | "success";
}

export function Select({
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Select option...",
  disabled = false,
  size = "md",
  className,
  status = "default",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalVal, setInternalVal] = useState(value || defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedVal = value !== undefined ? value : internalVal;
  const selectedOption = options.find((o) => o.value === selectedVal);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(val: string) {
    setInternalVal(val);
    onChange?.(val);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-[44px] w-full items-center justify-between rounded-sm border border-border bg-background px-4 font-interface text-body-default text-foreground transition-colors hover:border-brand-gold-muted focus-visible:border-brand-gold-polished focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-40 disabled:cursor-not-allowed",
          status === "error" && "border-semantic-error",
          size === "sm" && "min-h-[36px] text-body-small px-3",
          size === "lg" && "min-h-[52px] text-body-default px-5",
        )}
      >
        <span className={cn(!selectedOption && "text-muted")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn("size-4 text-muted transition-transform duration-standard", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-dropdown-menu mt-1 max-h-60 w-full overflow-auto rounded-sm border border-border bg-surface p-1 shadow-high animate-in fade-in zoom-in-95"
        >
          {options.map((opt) => {
            const isSelected = opt.value === selectedVal;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                className={cn(
                  "flex items-center justify-between rounded-sm px-3 py-2 text-body-small cursor-pointer transition-colors",
                  opt.disabled && "opacity-40 cursor-not-allowed",
                  !opt.disabled && "hover:bg-accent-subtle hover:text-brand-gold-polished",
                  isSelected && "bg-accent-subtle font-medium text-brand-gold-polished",
                )}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  disabled = false,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleOption(val: string) {
    if (value.includes(val)) {
      onChange?.(value.filter((v) => v !== val));
    } else {
      onChange?.([...value, val]);
    }
  }

  const selectedLabels = options.filter((o) => value.includes(o.value));

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-[44px] w-full flex-wrap items-center justify-between gap-1 rounded-sm border border-border bg-background p-2 transition-colors cursor-pointer hover:border-brand-gold-muted",
          disabled && "opacity-40 cursor-not-allowed",
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {selectedLabels.length === 0 ? (
            <span className="text-muted text-body-default px-2">{placeholder}</span>
          ) : (
            selectedLabels.map((item) => (
              <span
                key={item.value}
                className="inline-flex items-center gap-1 rounded-sm bg-accent-subtle px-2 py-0.5 text-body-small font-medium text-brand-gold-polished"
              >
                {item.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(item.value);
                  }}
                  className="hover:text-foreground"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
        <svg className={cn("size-4 text-muted transition-transform", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute left-0 top-full z-dropdown-menu mt-1 max-h-60 w-full overflow-auto rounded-sm border border-border bg-surface p-1 shadow-high">
          {options.map((opt) => {
            const isChecked = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className="flex items-center gap-2 rounded-sm px-3 py-2 text-body-small cursor-pointer hover:bg-accent-subtle hover:text-brand-gold-polished"
              >
                <input type="checkbox" checked={isChecked} readOnly className="size-4 rounded-sm border-border text-brand-gold-polished" />
                <span>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
