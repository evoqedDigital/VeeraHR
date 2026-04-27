import { PageShell } from "@/components/PageShell";
import { emailDisplay } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Information",
  description: "Legal information, compliance, and company details for Veera HR Consultancy.",
};

export default function LegalInformationPage() {
  return (
    <PageShell
      eyebrow="quick contact:"
      title="Legal Information"
      lastUpdated="02/22/2025"
      intro="Welcome to Veera HR Consultancy. This Legal Information page provides details regarding our company’s legal standing, compliance, and obligations under United Arab Emirates (UAE) laws."
    >
      <h2>1. Company Details</h2>
      <ul>
        <li>Company Name: Veera HR Consultancy</li>
      </ul>
      <h2>2. Compliance with UAE Laws</h2>
      <p>Veera HR operates in full compliance with UAE labor laws, data protection laws, and business regulations, including but not limited to:</p>
      <ul>
        <li>UAE Federal Decree-Law No. 33 of 2021 (Regulating Labor Relations)</li>
        <li>UAE Personal Data Protection Law (PDPL) – Federal Decree-Law No. 45 of 2021</li>
        <li>Commercial Companies Law – Federal Law No. 2 of 2015</li>
        <li>Relevant Free Zone Authority Regulations (if applicable)</li>
      </ul>
      <h2>3. Intellectual Property Rights</h2>
      <ul>
        <li>All content on this website, including logos, text, graphics, and trademarks, is the property of Veera HR or used with permission.</li>
        <li>Unauthorized use, reproduction, or distribution of our content is strictly prohibited and may result in legal action.</li>
      </ul>
      <h2>4. Liability Disclaimer</h2>
      <ul>
        <li>While we strive for accuracy, Veera HR does not guarantee that the information on this website is always up to date or free from errors.</li>
        <li>We are not liable for any direct, indirect, or consequential damages arising from the use of our services or website.</li>
      </ul>
      <h2>5. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. Veera HR is not responsible for their content, privacy practices, or policies.</p>
      <h2>6. Governing Law &amp; Jurisdiction</h2>
      <ul>
        <li>All legal matters related to Veera HR shall be governed by UAE laws.</li>
        <li>Any disputes shall be subject to the jurisdiction of UAE courts or relevant free zone dispute resolution authorities.</li>
      </ul>
      <h2>7. Contact Information</h2>
      <p>For legal inquiries, you may contact us at:</p>
      <p>
        Email:{" "}
        <a className="text-brand hover:underline" href={`mailto:${emailDisplay}`}>
          {emailDisplay}
        </a>
        <br />
        Registered Address: ARZOO BUILDING, OFFICE NO 110, 111 FIRST FLOOR, DUBAI, UAE
      </p>
      <p className="pt-4 text-sm">
        <Link className="text-brand hover:underline" href="/">
          ← Back to home
        </Link>
      </p>
    </PageShell>
  );
}
