import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Veera HR Consultancy",
  description: "Terms governing the use of Veera HR Consultancy website and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        label="Legal"
        title={
          <>
            Terms Of <span className="text-[#a89cff]">Service</span>
          </>
        }
        subtitle="Please review the terms that apply when using our website and services."
      />
      <section className="mx-auto max-w-[1100px] px-4 py-12 sm:px-10">
        <div className="space-y-7 rounded-2xl border border-[#eceef6] bg-white p-6 text-sm leading-relaxed text-[#4a4f63] sm:p-8">
          <p>
            These Terms of Service govern your use of the Veera HR Consultancy website and related
            services. By accessing this site, you agree to these terms and to applicable UAE laws and
            regulations.
          </p>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">1. Acceptable Use</h3>
            <p>
              You agree to use this website for lawful recruitment, employment, and business purposes
              only. Misuse, unauthorized access attempts, fraudulent submissions, scraping, or harmful
              behavior is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">2. Service Scope</h3>
            <p>
              Veera HR Consultancy provides HR, recruitment, manpower, and related support services.
              Website information is general and may be updated, modified, or removed without prior
              notice based on operational and legal requirements.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">3. Candidate and Client Submissions</h3>
            <p>
              You are responsible for ensuring submitted information is accurate and lawful. We reserve
              the right to reject or remove submissions that are incomplete, misleading, abusive, or in
              conflict with applicable laws.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">4. Intellectual Property</h3>
            <p>
              All content, branding, visuals, and materials on this website are owned by or licensed to
              Veera HR Consultancy unless otherwise stated. Reproduction, redistribution, or reuse without
              written permission is prohibited.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">5. Limitation of Liability</h3>
            <p>
              To the extent permitted by law, Veera HR Consultancy is not liable for indirect or
              consequential losses arising from website use, service delays, connectivity issues, third
              party systems, or reliance on general website information.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">6. Third-Party Links and Platforms</h3>
            <p>
              This site may include links to external services (such as social platforms). We are not
              responsible for third-party content, privacy practices, availability, or terms of those
              services.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">7. Governing Law and Jurisdiction</h3>
            <p>
              These terms are governed by applicable laws of the United Arab Emirates. Any dispute shall
              be subject to the jurisdiction of the competent courts in the UAE unless otherwise required
              by mandatory legal provisions.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-[#1a1a3e]">8. Contact</h3>
            <p>
              For legal questions, service issues, or formal notices, contact Veera HR Consultancy at
              admin@veerahr.com.
            </p>
          </div>
        </div>
      </section>
      <CtaBand
        label="Need Help?"
        title="Talk To Our Team\nToday"
        href="/contact"
        button="Get In Touch →"
      />
    </>
  );
}
