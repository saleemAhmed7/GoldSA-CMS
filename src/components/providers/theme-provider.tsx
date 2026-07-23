"use client";

import { useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

const themeStorageKey = "goldsa-theme";

function resolveStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    applyTheme(resolveStoredTheme());
  }, []);

  return children;
}
