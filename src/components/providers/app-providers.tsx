"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { GoldPriceProvider } from "@/components/providers/gold-price-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <GoldPriceProvider>{children}</GoldPriceProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
