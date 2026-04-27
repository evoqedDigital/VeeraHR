import { HandoffFrame } from "@/components/HandoffFrame";
import { siteDescription, siteName } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteName} Your Global Partner for Exceptional HR Solutions`,
  description: siteDescription,
};

export default function Home() {
  return <HandoffFrame fileName="index.html" title="Veera HR Home" />;
}
