import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile",
  openGraph: { title: "Veera HR Brochure" },
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  redirect("/Veera-HR-Brochure.pdf");
}
