import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Topbar } from "@/components/Topbar";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | HR Solutions Dubai`,
    template: `%s | ${site.name}`,
  },
  description:
    "Dubai-based HR consultancy and staffing since 2004. Recruitment, workforce management, and global talent for UAE and beyond.",
  openGraph: {
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Topbar />
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
