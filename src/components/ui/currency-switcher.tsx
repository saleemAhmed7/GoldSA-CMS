"use client";

import { useCurrency, currencyMap, type Currency } from "@/components/providers/currency-provider";
import { DropdownMenu, type MenuItem } from "./dropdown-menu";
import { cn } from "@/lib/cn";

const currencyOptions: Currency[] = ["TRY", "USD", "SAR"];

export function CurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const activeConfig = currencyMap[currency];

  const menuItems: MenuItem[] = currencyOptions.map((code) => {
    const config = currencyMap[code];
    const isSelected = currency === code;
    return {
      id: code,
      label: (
        <div className="flex min-h-9 w-full items-center justify-between rounded-sm px-2.5 py-1.5">
          <div className="flex items-center gap-2.5">
            <span className="flex w-5 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-gold-polished">
              {config.symbol}
            </span>
            <span className={cn("text-[12px] font-medium tracking-[0.02em]", isSelected ? "font-semibold text-brand-gold-polished" : "text-foreground")}>
              {code}
            </span>
          </div>
          {isSelected && <span className="text-[11px] font-semibold text-brand-gold-polished">✓</span>}
        </div>
      ),
      onClick: () => setCurrency(code),
    };
  });

  return (
    <div className={cn("inline-block", className)}>
      <DropdownMenu
        align="right"
        trigger={
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border bg-surface hover:border-brand-gold-polished/50 transition-colors shadow-flat text-body-small font-medium text-foreground"
            aria-label="Select currency"
          >
            <span className="font-mono font-bold text-xs text-brand-gold-polished">{activeConfig.symbol}</span>
            <span className="font-mono text-xs text-muted uppercase">{currency}</span>
            <svg className="size-3.5 text-muted ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        }
        items={menuItems}
      />
    </div>
  );
}
