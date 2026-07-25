"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Input, type InputProps } from "./input";

interface SearchInputProps extends Omit<InputProps, "variant"> {
  onClear?: () => void;
  isLoading?: boolean;
}

export function SearchInput({
  className,
  value,
  defaultValue,
  onChange,
  onClear,
  isLoading = false,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState<string>(
    (value as string) || (defaultValue as string) || "",
  );

  const query = (value as string) !== undefined ? (value as string) : internalValue;

  function handleClear() {
    setInternalValue("");
    onClear?.();
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        {isLoading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
      <Input
        variant="search"
        type="search"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange?.(e);
        }}
        className={cn("pl-9 pr-8", className)}
        {...props}
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export type { SearchInputProps };
