"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface TagsInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TagsInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Add a tag...",
  disabled = false,
  className,
}: TagsInputProps) {
  const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");

  const tags = value !== undefined ? value : internalTags;

  function updateTags(newTags: string[]) {
    setInternalTags(newTags);
    onChange?.(newTags);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !tags.includes(trimmed)) {
        updateTags([...tags, trimmed]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      updateTags(tags.slice(0, -1));
    }
  }

  function removeTag(index: number) {
    if (disabled) return;
    updateTags(tags.filter((_, i) => i !== index));
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 min-h-[44px] w-full rounded-sm border border-border bg-background p-2 transition-colors focus-within:border-brand-gold-polished focus-within:ring-2 focus-within:ring-focus-ring",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      {tags.map((tag, idx) => (
        <span
          key={`${tag}-${idx}`}
          className="inline-flex items-center gap-1 rounded-sm border border-brand-gold-muted/30 bg-accent-subtle px-2 py-0.5 text-body-small font-medium text-brand-gold-polished"
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-brand-gold-muted hover:text-brand-gold-polished focus:outline-none"
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          )}
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        disabled={disabled}
        placeholder={tags.length === 0 ? placeholder : ""}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[100px] bg-transparent text-body-default text-foreground placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}

export type { TagsInputProps };
