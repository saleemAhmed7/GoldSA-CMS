"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Input } from "./input";

export interface AutocompleteItem {
  id: string;
  label: string;
  category?: string;
}

export interface AutocompleteProps {
  items: AutocompleteItem[];
  value?: string;
  onChange?: (val: string) => void;
  onSelect?: (item: AutocompleteItem) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Autocomplete({
  items,
  value = "",
  onChange,
  onSelect,
  placeholder = "Type to search...",
  disabled = false,
  className,
}: AutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <Input
        type="text"
        value={query}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange?.(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && filtered.length > 0 && (
        <ul className="absolute left-0 top-full z-dropdown-menu mt-1 max-h-60 w-full overflow-auto rounded-sm border border-border bg-surface p-1 shadow-high">
          {filtered.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setQuery(item.label);
                onSelect?.(item);
                onChange?.(item.label);
                setIsOpen(false);
              }}
              className="flex flex-col rounded-sm px-3 py-2 text-body-small cursor-pointer hover:bg-accent-subtle hover:text-brand-gold-polished"
            >
              <span className="font-medium text-foreground">{item.label}</span>
              {item.category && <span className="text-label-meta text-muted">{item.category}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  onPerform: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
  placeholder?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  commands,
  placeholder = "Type a command or search...",
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matches = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-modal-popup flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-sm border border-border bg-surface shadow-overlay overflow-hidden">
        <div className="border-b border-border p-3">
          <Input
            autoFocus
            variant="search"
            value={search}
            placeholder={placeholder}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {matches.length === 0 ? (
            <div className="p-4 text-center text-body-small text-muted">No commands found</div>
          ) : (
            matches.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                onClick={() => {
                  cmd.onPerform();
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-body-small text-foreground hover:bg-accent-subtle hover:text-brand-gold-polished"
              >
                <span>{cmd.label}</span>
                {cmd.shortcut && (
                  <kbd className="rounded bg-background border border-border px-1.5 py-0.5 text-label-meta text-muted">
                    {cmd.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
