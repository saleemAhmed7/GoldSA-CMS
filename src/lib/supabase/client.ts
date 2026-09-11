import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Returns active Supabase project configuration details from process.env.
 */
export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || "";
  const isConfigured = Boolean(url.length > 0 && key.length > 0);

  return {
    url,
    key,
    isConfigured,
  };
}

/**
 * Checks if real, non-empty Supabase environment variables are loaded.
 */
export function isSupabaseEnvConfigured(): boolean {
  return getSupabaseConfig().isConfigured;
}

/**
 * Creates a browser-side Supabase client using NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
 */
export function createClient() {
  const config = getSupabaseConfig();
  return createBrowserClient<Database>(config.url, config.key);
}
