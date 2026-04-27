import { PageShell } from "@/components/PageShell";
import { emailDisplay } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms Of Service",
  description: "Terms of service for using Veera HR Consultancy’s website and services.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="quick contact:"
      title="Terms Of Service"
      lastUpdated="02/22/2025"
      intro="Welcome to Veera HR Consultancy. These Terms of Service govern your access to and use of our website (www.veerahr.com) and services. By using our website and services, you agree to comply with these terms. If you do not agree, please do not use our services."
    >
      <h2>1. Definitions</h2>
      <ul>
        <li>“Veera HR” refers to our company, website, and services.</li>
        <li>“User”, “You”, or “Your” refers to anyone accessing or using our website and services.</li>
        <li>“Services” refers to recruitment, HR consulting, and related offerings provided by Veera HR.</li>
      </ul>
      <h2>2. Use of Services</h2>
      <p>By using our services, you agree that:</p>
      <ul>
        <li>You will provide accurate and truthful information.</li>
        <li>You will not use our services for fraudulent or unlawful activities.</li>
        <li>You will not attempt to disrupt or harm our website or business operations.</li>
        <li>You must comply with all applicable UAE laws and regulations.</li>
      </ul>
      <h2>3. Recruitment &amp; HR Services</h2>
      <ul>
        <li>Veera HR acts as an intermediary between job seekers and employers but does not guarantee employment.</li>
        <li>Employers and candidates are responsible for verifying the accuracy of the information they provide.</li>
        <li>We do not take responsibility for employment contracts, salaries, or workplace disputes.</li>
      </ul>
      <h2>4. User Accounts &amp; Registration</h2>
      <ul>
        <li>Some services may require account registration. You must maintain confidentiality of your login details.</li>
        <li>We reserve the right to suspend or terminate accounts that violate our terms or UAE regulations.</li>
      </ul>
      <h2>5. Intellectual Property</h2>
      <ul>
        <li>All content, trademarks, logos, and materials on this website are owned by Veera HR or licensed for use.</li>
        <li>You may not copy, reproduce, or distribute our content without prior written permission.</li>
      </ul>
      <h2>6. Limitation of Liability</h2>
      <ul>
        <li>Veera HR provides services “as is” and makes no guarantees regarding job placements or HR outcomes.</li>
        <li>We are not liable for any losses, damages, or disputes arising from employment or business decisions made using our services.</li>
        <li>We do not take responsibility for third-party content or links available on our website.</li>
      </ul>
      <h2>7. Data Protection &amp; Privacy</h2>
      <p>
        We collect and process personal data in accordance with our Privacy Policy and UAE Personal Data Protection Law
        (PDPL). By using our services, you consent to data collection as outlined in our Privacy Policy.
      </p>
      <h2>8. Termination of Services</h2>
      <ul>
        <li>Veera HR reserves the right to suspend or terminate services at any time for violations of these terms or UAE laws.</li>
        <li>Users may discontinue using our services at any time.</li>
      </ul>
      <h2>9. Governing Law &amp; Dispute Resolution</h2>
      <ul>
        <li>These terms are governed by the laws of the United Arab Emirates.</li>
        <li>Any disputes shall be resolved through negotiation or legal proceedings in the UAE.</li>
      </ul>
      <h2>10. Changes to These Terms</h2>
      <p>
        We may update these Terms of Service as needed. Changes will be posted on this page with the revised date.
        Continued use of our services after changes means you accept the updated terms.
      </p>
      <h2>11. Contact Us</h2>
      <p>For any questions about these terms, contact us at:</p>
      <p>
        Email:{" "}
        <a className="text-brand hover:underline" href={`mailto:${emailDisplay}`}>
          {emailDisplay}
        </a>
        <br />
        Address: ARZOO BUILDING, OFFICE NO 110, 111 FIRST FLOOR, DUBAI, UAE
      </p>
      <p className="pt-4 text-sm">
        <Link className="text-brand hover:underline" href="/">
          ← Back to home
        </Link>
      </p>
    </PageShell>
  );
}
