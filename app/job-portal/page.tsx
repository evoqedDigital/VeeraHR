import { JobPortalClient } from "@/components/job-portal/JobPortalClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Portal | Find Your Dream Job In UAE & Beyond",
  description:
    "Browse verified job openings, filter by category and location, and apply with Veera HR Consultancy.",
  openGraph: {
    title: "Job Portal | Veera HR Consultancy",
  },
};

export default function JobPortalPage() {
  return <JobPortalClient />;
}
