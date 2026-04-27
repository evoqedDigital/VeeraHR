import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Veera HR Consultancy",
  description: "How Veera HR Consultancy collects, uses, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title={
          <>
            Privacy <span className="text-[#a89cff]">Policy</span>
          </>
        }
        subtitle="Your privacy matters to us. This policy explains how we handle your personal information."
      />
      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-10">
        <div className="space-y-7 rounded-2xl border border-[#eceef6] bg-white p-6 text-sm leading-relaxed text-[#4a4f63] sm:p-8">
          <p>
            This Privacy Policy explains how Veera HR Consultancy collects, uses, stores, and protects
            personal data in line with applicable UAE laws and regulations, including UAE data
            protection and electronic transactions requirements.
          </p>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">1. Information We Collect</h3>
            <p>
              We may collect personal and business information including name, email address, phone
              number, company details, job-related data, and any information submitted through website
              forms, job applications, or direct communication channels.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">2. Purpose of Processing</h3>
            <p>
              We process data to respond to inquiries, provide recruitment and HR services, manage job
              applications, communicate updates, maintain service quality, prevent misuse, and comply
              with UAE legal and regulatory obligations.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">3. Legal Basis and Consent</h3>
            <p>
              By submitting your information, you consent to processing for legitimate service and
              recruitment purposes. Where required, we may request additional consent before using your
              data for specific communication or marketing purposes.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">4. Data Sharing</h3>
            <p>
              We do not sell personal information. Data may be shared only with authorized internal
              staff, clients, candidates, and service providers where necessary for service delivery,
              recruitment workflows, legal compliance, or system operations.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">5. Data Retention</h3>
            <p>
              We retain personal data only for as long as needed for business, recruitment, and legal
              purposes. Data no longer required is securely deleted or anonymized according to internal
              retention controls.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">6. Security Measures</h3>
            <p>
              We use reasonable technical and organizational safeguards to protect data from unauthorized
              access, disclosure, loss, or misuse. While no internet transmission is fully secure, we
              continuously improve our controls and monitoring.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">7. Your Rights</h3>
            <p>
              Subject to applicable law, you may request access, correction, update, or deletion of your
              data, and may withdraw consent for specific processing where permitted. Requests can be
              sent to admin@veerahr.com.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">8. Policy Updates</h3>
            <p>
              We may update this policy to reflect legal, regulatory, operational, or service changes in
              the UAE. Updated versions become effective once published on this website.
            </p>
          </div>
        </div>
      </section>
      <CtaBand
        label="Need Clarification?"
        title="Questions About\nYour Privacy?"
        href="/contact"
        button="Contact Our Team →"
      />
    </>
  );
}
