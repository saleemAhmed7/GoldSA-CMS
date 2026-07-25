"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { type Language } from "@/config/i18n";
import { IconButton } from "./icon-button";
import { DropdownMenu, type MenuItem } from "./dropdown-menu";
import { cn } from "@/lib/cn";

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: "ar", label: "العربية", flag: "🇸🇦" },
  { value: "tr", label: "Türkçe", flag: "🇹🇷" },
  { value: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const menuItems: MenuItem[] = languageOptions.map((opt) => ({
    id: opt.value,
    label: (
      <span className="flex items-center gap-2">
        <span>{opt.flag}</span>
        <span className={cn(opt.value === language && "font-semibold text-brand-gold-polished")}>
          {opt.label}
        </span>
      </span>
    ),
    onClick: () => setLanguage(opt.value),
  }));

  return (
    <div className={cn("inline-block", className)}>
      <DropdownMenu
        align="right"
        trigger={
          <IconButton
            variant="outline"
            size="sm"
            aria-label="Select language"
            title="Language"
            icon={
              <svg className="size-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3.6 9h16.8 M3.6 15h16.8 M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"
                />
              </svg>
            }
          />
        }
        items={menuItems}
      />
    </div>
  );
}
