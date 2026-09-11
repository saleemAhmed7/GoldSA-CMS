"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchLiveGoldRates, type LiveGoldRatesData } from "@/lib/gold-price-api";
import type { GoldSpotRatesTRY } from "@/features/products/types";

interface GoldPriceContextValue {
  rates: GoldSpotRatesTRY;
  goldUsdPerOunce: number;
  usdTryRate: number;
  lastUpdated: string;
  isLive: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const GoldPriceContext = createContext<GoldPriceContextValue | null>(null);

export function GoldPriceProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LiveGoldRatesData>({
    rates: { "24K": 3150, "22K": 2888, "18K": 2362 },
    goldUsdPerOunce: 2650,
    usdTryRate: 36.8,
    lastUpdated: "",
    isLive: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  async function loadRates() {
    setIsLoading(true);
    const result = await fetchLiveGoldRates();
    setData(result);
    setIsLoading(false);
  }

  useEffect(() => {
    loadRates();
    // Auto-refresh every 60 seconds
    const interval = setInterval(loadRates, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GoldPriceContext.Provider
      value={{
        rates: data.rates,
        goldUsdPerOunce: data.goldUsdPerOunce,
        usdTryRate: data.usdTryRate,
        lastUpdated: data.lastUpdated,
        isLive: data.isLive,
        isLoading,
        refresh: loadRates,
      }}
    >
      {children}
    </GoldPriceContext.Provider>
  );
}

export function useGoldPrice() {
  const context = useContext(GoldPriceContext);
  if (!context) {
    throw new Error("useGoldPrice must be used within a GoldPriceProvider");
  }
  return context;
}
