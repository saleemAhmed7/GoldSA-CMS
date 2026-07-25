"use client";

import { useCurrency, currencyMap, type Currency } from "@/components/providers/currency-provider";
import { IconButton } from "./icon-button";
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
        <span className="flex items-center gap-2">
          <span className="font-semibold text-brand-gold-polished w-6 text-center">{config.symbol}</span>
          <span className={cn(isSelected && "font-semibold text-brand-gold-polished")}>
            {code} ({config.symbol})
          </span>
        </span>
      ),
      onClick: () => setCurrency(code),
    };
  });

  return (
    <div className={cn("inline-block", className)}>
      <DropdownMenu
        align="right"
        trigger={
          <IconButton
            variant="outline"
            size="sm"
            aria-label="Select currency"
            title={`Currency (${currency})`}
            icon={
              <span className="font-semibold text-brand-gold-polished text-body-default">
                {activeConfig.symbol}
              </span>
            }
          />
        }
        items={menuItems}
      />
    </div>
  );
}
