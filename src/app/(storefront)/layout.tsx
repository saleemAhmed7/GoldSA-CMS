import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "GoldSA CMS",
  description: "Luxury jewelry storefront foundation.",
};

export default function StorefrontLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AppShell variant="storefront">{children}</AppShell>;
}
