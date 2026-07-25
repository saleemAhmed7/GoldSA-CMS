"use client";

import type { ReactNode } from "react";
import { useState, createContext, useContext } from "react";
import { cn } from "@/lib/cn";

export type TabsVariant = "horizontal" | "vertical" | "pill" | "underline";
export type TabsSize = "sm" | "md" | "lg";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: TabsVariant;
  size: TabsSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (id: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  defaultValue = "",
  value,
  onChange,
  variant = "underline",
  size = "md",
  children,
  className,
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalTab;

  function setActiveTab(id: string) {
    setInternalTab(id);
    onChange?.(id);
  }

  const isVertical = variant === "vertical";

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, size }}>
      <div className={cn("flex", isVertical ? "flex-row gap-6" : "flex-col gap-4", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function TabList({ children, className, ariaLabel = "Tabs" }: TabListProps) {
  const ctx = useContext(TabsContext);
  const isVertical = ctx?.variant === "vertical";
  const isPill = ctx?.variant === "pill";
  const isUnderline = ctx?.variant === "underline";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex",
        isVertical ? "flex-col gap-1 border-r border-border pr-4" : "flex-row gap-2 border-b border-border pb-0.5",
        isPill && "gap-1 rounded-sm border-none bg-surface p-1 shadow-flat",
        isUnderline && "gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface TabTriggerProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function TabTrigger({ value, children, disabled = false, className }: TabTriggerProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;

  const isActive = ctx.activeTab === value;
  const isPill = ctx.variant === "pill";
  const isUnderline = ctx.variant === "underline";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => ctx.setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-standard ease-out-quart focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-40 disabled:pointer-events-none",
        ctx.size === "sm" && "py-1.5 px-3 text-body-small",
        ctx.size === "md" && "py-2 px-4 text-body-default",
        ctx.size === "lg" && "py-3 px-5 text-body-default",
        isUnderline &&
          cn(
            "border-b-2 border-transparent text-muted hover:text-foreground",
            isActive && "border-brand-gold-polished text-brand-gold-polished font-semibold",
          ),
        isPill &&
          cn(
            "rounded-sm text-muted hover:text-foreground",
            isActive && "bg-brand-gold-polished text-brand-obsidian font-semibold shadow-low",
          ),
        className,
      )}
    >
      {children}
    </button>
  );
}

export interface TabContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabContent({ value, children, className }: TabContentProps) {
  const ctx = useContext(TabsContext);
  if (!ctx || ctx.activeTab !== value) return null;

  return (
    <div role="tabpanel" className={cn("animate-in fade-in duration-standard", className)}>
      {children}
    </div>
  );
}


