"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Language, type TranslationDictionary } from "@/config/i18n";

type Direction = "rtl" | "ltr";

interface LanguageContextValue {
  language: Language;
  dir: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationDictionary) => string;
}

const langStorageKey = "goldsa-language";
const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return "ar";
  }
  const stored = window.localStorage.getItem(langStorageKey) as Language | null;
  if (stored === "ar" || stored === "tr" || stored === "en") {
    return stored;
  }
  return "ar";
}

function applyLanguage(lang: Language) {
  const dir: Direction = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    const initial = resolveStoredLanguage();
    setLanguageState(initial);
    applyLanguage(initial);
  }, []);

  function setLanguage(newLang: Language) {
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(langStorageKey, newLang);
    }
    applyLanguage(newLang);
  }

  const dir: Direction = language === "ar" ? "rtl" : "ltr";

  function t(key: keyof TranslationDictionary): string {
    const dict = translations[language] || translations.ar;
    return dict[key] || translations.ar[key] || String(key);
  }

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      language: "ar" as Language,
      dir: "rtl" as Direction,
      setLanguage: () => {},
      t: (key: keyof TranslationDictionary) => translations.ar[key] || String(key),
    };
  }
  return ctx;
}
