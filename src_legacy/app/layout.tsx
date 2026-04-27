import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { siteDescription, siteName } from "@/lib/site";
import "./globals.css";

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://veerahr.com";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${siteName} — ${siteDescription.split(".")[0]}.`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName,
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dm.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-white font-sans text-zinc-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
