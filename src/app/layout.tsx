import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProviders } from "@/components/providers/app-providers";
import { envConfig } from "@/config/env-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(envConfig.appUrl),
  title: {
    default: envConfig.appName,
    template: `%s | ${envConfig.appName}`,
  },
  description: "Luxury jewelry storefront and CMS foundation for premium gold and diamond retail.",
  applicationName: envConfig.appName,
  openGraph: {
    title: envConfig.appName,
    description: "Premium CMS foundation for luxury jewelry experiences.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
