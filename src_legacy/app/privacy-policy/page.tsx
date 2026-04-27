import { PageShell } from "@/components/PageShell";
import { addressUae, emailDisplay } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Veera HR Consultancy privacy policy — how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      eyebrow="quick contact:"
      title="Privacy Policy"
      lastUpdated="02/22/2025"
      intro="Welcome to Veera HR Consultancy. Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal data in compliance with the UAE Personal Data Protection Law (PDPL) and other applicable laws."
    >
      <h2>1. Information We Collect</h2>
      <p>We may collect and process the following types of personal data:</p>
      <ul>
        <li>Personal Information: Name, email address, phone number, nationality, job title, and company name.</li>
        <li>Employment Information: Resume, work experience, qualifications, and references (for recruitment purposes).</li>
        <li>Technical Information: IP address, browser type, operating system, and browsing behavior on our website.</li>
        <li>Communication Data: Any messages, inquiries, or feedback submitted through our website or email.</li>
      </ul>
      <h2>2. How We Use Your Information</h2>
      <p>We collect and use your personal data for the following purposes:</p>
      <ul>
        <li>To provide HR services, recruitment assistance, and consulting.</li>
        <li>To process job applications and connect candidates with potential employers.</li>
        <li>To improve our website, services, and user experience.</li>
        <li>To respond to inquiries, provide customer support, and communicate with users.</li>
        <li>To comply with UAE legal and regulatory requirements.</li>
      </ul>
      <h2>3. Legal Basis for Processing</h2>
      <p>We process your data based on:</p>
      <ul>
        <li>Your Consent: When you voluntarily provide your information.</li>
        <li>Legitimate Interest: To improve our services and respond to inquiries.</li>
        <li>Contractual Necessity: When processing is required to provide our HR services.</li>
        <li>Legal Compliance: To meet UAE legal obligations.</li>
      </ul>
      <h2>4. Data Sharing &amp; Disclosure</h2>
      <p>We do not sell or rent your personal data. However, we may share your information in the following cases:</p>
      <ul>
        <li>With Employers &amp; Clients: When processing job applications and recruitment services.</li>
        <li>With Service Providers: Third-party vendors that help us operate our website and services.</li>
        <li>Legal Requirements: If required by UAE authorities for legal or regulatory compliance.</li>
      </ul>
      <h2>5. Data Storage &amp; Security</h2>
      <p>
        We implement strict security measures to protect your data from unauthorized access, alteration, or
        disclosure. Your data is stored securely in compliance with UAE laws.
      </p>
      <h2>6. Your Rights Under UAE Law</h2>
      <p>You have the following rights regarding your personal data:</p>
      <ul>
        <li>Right to Access: Request a copy of your personal data.</li>
        <li>Right to Correction: Update or correct inaccurate information.</li>
        <li>Right to Deletion: Request data deletion under certain conditions.</li>
        <li>Right to Withdraw Consent: If processing is based on consent, you may withdraw it at any time.</li>
        <li>Right to Object: Restrict or object to data processing in specific circumstances.</li>
      </ul>
      <h2>7. Cookies &amp; Tracking Technologies</h2>
      <p>
        Our website may use cookies to improve user experience. You can manage cookie preferences through your
        browser settings.
      </p>
      <h2>8. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not responsible for their privacy practices, so
        we recommend reviewing their policies before sharing personal data.
      </p>
      <h2>9. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy as needed to reflect changes in UAE laws or our business practices. Any
        updates will be posted on this page with the revised date.
      </p>
      <h2>10. Contact Us</h2>
      <p>For any questions or requests regarding your privacy, please contact us at:</p>
      <p>
        Email:{" "}
        <a className="text-brand hover:underline" href={`mailto:${emailDisplay}`}>
          {emailDisplay}
        </a>
        <br />
        Address: {addressUae}
      </p>
      <p className="pt-4 text-sm">
        <Link className="text-brand hover:underline" href="/">
          ← Back to home
        </Link>
      </p>
    </PageShell>
  );
}
