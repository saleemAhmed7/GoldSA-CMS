"use client";

import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

// Drawer
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  position?: "left" | "right" | "bottom";
  children: ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  position = "right",
  children,
  className,
}: DrawerProps) {
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

  const positionStyles = {
    left: "left-0 top-0 bottom-0 w-80 max-w-full slide-in-from-left",
    right: "right-0 top-0 bottom-0 w-96 max-w-full slide-in-from-right",
    bottom: "bottom-0 left-0 right-0 max-h-[80vh] rounded-t-lg slide-in-from-bottom",
  };

  return (
    <div className="fixed inset-0 z-drawer-slide flex bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className={cn(
          "absolute flex flex-col border-border bg-surface shadow-overlay overflow-hidden animate-in duration-standard",
          positionStyles[position],
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h3 className="text-header-3 font-display font-medium text-foreground">{title}</h3>
            <button type="button" onClick={onClose} className="text-muted hover:text-foreground text-lg">
              ×
            </button>
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// Tooltip
export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ content, children, position = "top", className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const posStyles = {
    top: "-top-8 left-1/2 -translate-x-1/2",
    bottom: "-bottom-8 left-1/2 -translate-x-1/2",
    left: "-left-2 top-1/2 -translate-x-full -translate-y-1/2",
    right: "-right-2 top-1/2 translate-x-full -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-dropdown-menu whitespace-nowrap rounded bg-brand-obsidian border border-border px-2.5 py-1 text-label-meta text-brand-off-white shadow-medium pointer-events-none animate-in fade-in duration-150",
            posStyles[position],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

// Popover
export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Popover({ trigger, children, className }: PopoverProps) {
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

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-full z-dropdown-menu mt-2 min-w-[220px] rounded-sm border border-border bg-surface p-4 shadow-high animate-in fade-in zoom-in-95",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
