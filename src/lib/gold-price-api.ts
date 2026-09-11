import type { GoldSpotRatesTRY } from "@/features/products/types";

export interface LiveGoldRatesData {
  rates: GoldSpotRatesTRY;
  goldUsdPerOunce: number;
  usdTryRate: number;
  lastUpdated: string;
  isLive: boolean;
}

const DEFAULT_FALLBACK_RATES: LiveGoldRatesData = {
  rates: {
    "24K": 3150,
    "22K": 2888,
    "18K": 2362,
  },
  goldUsdPerOunce: 2650,
  usdTryRate: 36.8,
  lastUpdated: new Date().toISOString(),
  isLive: false,
};

// Simple in-memory cache to prevent excessive API requests
let ratesCache: { data: LiveGoldRatesData; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

/**
 * Fetches real-time live gold market rates per gram in TRY for 24K, 22K, and 18K.
 * Automatically converts Gold Spot (XAU/USD) and USD/TRY exchange rates.
 */
export async function fetchLiveGoldRates(): Promise<LiveGoldRatesData> {
  const now = Date.now();
  if (ratesCache && now - ratesCache.timestamp < CACHE_TTL_MS) {
    return ratesCache.data;
  }

  try {
    // Fetch live Gold/USD spot price
    const goldRes = await fetch("https://api.gold-api.com/price/XAU", { next: { revalidate: 60 } });
    let goldUsdPerOunce = 2650;
    if (goldRes.ok) {
      const goldData = await goldRes.json();
      if (goldData.price && typeof goldData.price === "number") {
        goldUsdPerOunce = goldData.price;
      }
    }

    // Fetch live USD/TRY exchange rate
    const fxRes = await fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 300 } });
    let usdTryRate = 36.8;
    if (fxRes.ok) {
      const fxData = await fxRes.json();
      if (fxData.rates && fxData.rates.TRY) {
        usdTryRate = fxData.rates.TRY;
      }
    }

    // 1 Troy Ounce = 31.1034768 grams
    const gram24kUSD = goldUsdPerOunce / 31.1034768;
    const rate24K = Math.round(gram24kUSD * usdTryRate);
    const rate22K = Math.round(rate24K * 0.9167);
    const rate18K = Math.round(rate24K * 0.75);

    const liveData: LiveGoldRatesData = {
      rates: {
        "24K": rate24K,
        "22K": rate22K,
        "18K": rate18K,
      },
      goldUsdPerOunce: Math.round(goldUsdPerOunce * 100) / 100,
      usdTryRate: Math.round(usdTryRate * 100) / 100,
      lastUpdated: new Date().toISOString(),
      isLive: true,
    };

    ratesCache = { data: liveData, timestamp: now };
    return liveData;
  } catch (error) {
    console.warn("Gold Price API offline or rate limited. Utilizing fallback rates.", error);
    return {
      ...DEFAULT_FALLBACK_RATES,
      lastUpdated: new Date().toISOString(),
    };
  }
}
