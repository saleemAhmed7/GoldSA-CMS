"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Currency = "TRY" | "USD" | "SAR";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  rateFromTRY: number;
  locale: string;
}

export const currencyMap: Record<Currency, CurrencyConfig> = {
  TRY: {
    code: "TRY",
    symbol: "₺",
    label: "Türk Lirası",
    rateFromTRY: 1.0,
    locale: "tr-TR",
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "US Dollar",
    rateFromTRY: 0.027,
    locale: "en-US",
  },
  SAR: {
    code: "SAR",
    symbol: "ر.س",
    label: "ريال سعودي",
    rateFromTRY: 0.10,
    locale: "ar-SA",
  },
};

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountInTRY: number) => string;
  convertPrice: (amountInTRY: number) => number;
  activeConfig: CurrencyConfig;
}

const currencyStorageKey = "goldsa-currency";
const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function resolveStoredCurrency(): Currency {
  if (typeof window === "undefined") {
    return "TRY";
  }
  const stored = window.localStorage.getItem(currencyStorageKey) as Currency | null;
  if (stored === "TRY" || stored === "USD" || stored === "SAR") {
    return stored;
  }
  return "TRY";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("TRY");

  useEffect(() => {
    setCurrencyState(resolveStoredCurrency());
  }, []);

  function setCurrency(newCur: Currency) {
    setCurrencyState(newCur);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(currencyStorageKey, newCur);
    }
  }

  const activeConfig = currencyMap[currency] || currencyMap.TRY;

  function convertPrice(amountInTRY: number): number {
    return amountInTRY * activeConfig.rateFromTRY;
  }

  function formatPrice(amountInTRY: number): string {
    const converted = convertPrice(amountInTRY);
    try {
      const formatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
        useGrouping: false,
      });
      return `${activeConfig.code} ${formatter.format(converted)}`;
    } catch {
      return `${activeConfig.code} ${converted.toFixed(2)}`;
    }
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice, activeConfig }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    const fallbackConfig = currencyMap.TRY;
    return {
      currency: "TRY" as Currency,
      setCurrency: () => {},
      formatPrice: (amount: number) => `TRY ${amount.toLocaleString("en-US", { useGrouping: false })}`,
      convertPrice: (amount: number) => amount,
      activeConfig: fallbackConfig,
    };
  }
  return ctx;
}
