import { HomePage } from "@/components/home/HomePage";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Global Partner For Exceptional HR Solutions",
  description: `${site.name} — HR solutions, staffing, and recruitment in Dubai and the GCC since 2004.`,
  openGraph: {
    title: "Veera HR Consultancy | Your Global Partner For Exceptional HR Solutions",
    description: "Trusted HR solutions provider connecting businesses with top talent worldwide.",
  },
};

export default function Home() {
  return <HomePage />;
}
