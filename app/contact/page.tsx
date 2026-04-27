import { ContactForm } from "@/components/ContactForm";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { social } from "@/lib/social";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Office in Bur Dubai",
  openGraph: { title: "Contact Veera HR Consultancy" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get In Touch"
        title={
          <>
            Contact <span className="text-[#a89cff]">Veera HR</span> Today
          </>
        }
        subtitle="We are here to help you find the right talent or the right opportunity."
      />
      <section className="grid grid-cols-1 gap-10 px-4 py-12 sm:px-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="mb-2 text-2xl font-extrabold text-[#1a1a3e]">
            Let&apos;s Start a <span className="text-[#6c63ff]">Conversation</span>
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#666]">
            Whether you&apos;re looking to hire top talent, explore career opportunities, or partner with
            us as an HR solutions provider — we&apos;d love to hear from you.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6c63ff]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a3e]">Our Office</h4>
                <p className="text-sm text-[#666]">
                  {site.address}
                  <br />
                  United Arab Emirates
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6c63ff]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a3e]">Phone</h4>
                <p className="text-sm text-[#666]">{site.phone}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6c63ff]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a3e]">Email</h4>
                <p className="text-sm text-[#666]">{site.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6c63ff]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a3e]">Business Hours</h4>
                <p className="text-sm text-[#666]">
                  {site.hours}
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0eeff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white"
              aria-label="Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0eeff] text-[#6c63ff] hover:bg-[#6c63ff] hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-6 sm:p-8">
          <h3 className="mb-4 text-lg font-extrabold text-[#1a1a3e]">Send Us a Message</h3>
          <ContactForm />
        </div>
      </section>
      <CtaBand
        label="Empower Your Business"
        title="Ready To Transform\nYour Workforce?"
        href="/contact"
        button="Get Started Today →"
      />
    </>
  );
}
