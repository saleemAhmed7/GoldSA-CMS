"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  swatches?: string[];
  disabled?: boolean;
  className?: string;
}

const defaultSwatches = [
  "#D4AF37", // Polished Gold
  "#C5A059", // Muted Gold
  "#E6D5B8", // Champagne
  "#1A1A1A", // Charcoal
  "#FCFBF9", // Cream
  "#10B981", // Success
  "#F59E0B", // Warning
  "#EF4444", // Error
  "#3B82F6", // Info
];

export function ColorPicker({
  value,
  defaultValue = "#D4AF37",
  onChange,
  swatches = defaultSwatches,
  disabled = false,
  className,
}: ColorPickerProps) {
  const [internalColor, setInternalColor] = useState(value || defaultValue);
  const color = value !== undefined ? value : internalColor;

  function updateColor(c: string) {
    setInternalColor(c);
    onChange?.(c);
  }

  return (
    <div className={cn("inline-flex flex-col gap-2 p-2 rounded-sm border border-border bg-surface", className)}>
      <div className="flex items-center gap-2">
        <label className="relative size-8 rounded-sm border border-border cursor-pointer overflow-hidden shadow-flat">
          <input
            type="color"
            value={color}
            disabled={disabled}
            onChange={(e) => updateColor(e.target.value)}
            className="absolute -inset-2 size-12 cursor-pointer opacity-0"
          />
          <span className="block size-full" style={{ backgroundColor: color }} />
        </label>
        <input
          type="text"
          value={color}
          disabled={disabled}
          onChange={(e) => updateColor(e.target.value)}
          className="w-28 rounded-sm border border-border bg-background px-2 py-1 font-mono text-body-small text-foreground uppercase focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold-polished"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
        {swatches.map((swatch) => (
          <button
            key={swatch}
            type="button"
            disabled={disabled}
            onClick={() => updateColor(swatch)}
            className={cn(
              "size-5 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold-polished",
              color.toLowerCase() === swatch.toLowerCase()
                ? "border-brand-gold-polished ring-1 ring-brand-gold-polished"
                : "border-border",
            )}
            style={{ backgroundColor: swatch }}
            aria-label={`Select color ${swatch}`}
          />
        ))}
      </div>
    </div>
  );
}

export type { ColorPickerProps };
