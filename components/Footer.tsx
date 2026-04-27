import Link from "next/link";
import Image from "next/image";
import { brand, site } from "@/lib/site";
import { social } from "@/lib/social";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0f1120] to-[#0a0c17] px-4 py-[64px] pb-[30px] text-[#aeb3c7] sm:px-10">
      <div className="footer-grid mx-auto grid max-w-[1600px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-[50px] lg:[grid-template-columns:2fr_1fr_1fr_1fr]">
        <div>
          <div className="h-[130px] w-[380px] overflow-hidden">
            <Image
              src="/Transparent.png"
              alt="Veera HR Consultancy"
              width={760}
              height={210}
              className="h-[130px] w-auto scale-[2] origin-left"
            />
          </div>
          <p className="my-4 text-[13px] leading-relaxed text-[#a7adc2]">
            <strong className="text-white">Veera HR,</strong> Trusted HR solutions provider with 21+ years
            of excellence, connecting businesses with top talent worldwide. Your partner in workforce
            success.
          </p>
          <div className="flex gap-2.5">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#1239D6]"
              aria-label="Facebook"
            >
              <svg className="h-[15px] w-[15px] fill-[#ccc]" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#1239D6]"
              aria-label="LinkedIn"
            >
              <svg className="h-[15px] w-[15px] fill-[#ccc]" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-[18px] text-sm font-bold text-white">Useful Pages</h4>
          <ul className="list-none">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/services", "Services"],
              ["/countries", "Countries"],
              ["/blog", "Blog"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href} className="mb-2.5">
                <Link
                  href={href}
                  className="text-[13px] text-[#a7adc2] no-underline transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-[18px] text-sm font-bold text-white">Quick Links</h4>
          <ul className="list-none">
            <li className="mb-2.5">
              <Link href="/privacy-policy" className="text-[13px] text-[#a7adc2] no-underline transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/terms-of-service" className="text-[13px] text-[#a7adc2] no-underline transition-colors hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-[18px] text-sm font-bold text-white">Have any questions?</h4>
          <div className="mb-3.5 flex gap-2.5">
            <svg
              className="mt-0.5 h-[15px] w-[15px] shrink-0"
              style={{ fill: brand.primary }}
              viewBox="0 0 24 24"
            >
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            <span className="text-[13px] leading-normal text-[#a7adc2]">Call: {site.phone}</span>
          </div>
          <div className="flex flex-col gap-2">
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#a7adc2] no-underline hover:text-white">
              Facebook
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#a7adc2] no-underline hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#7f869d] sm:flex-row sm:items-center">
        <span>
          ©{new Date().getFullYear()}. <strong className="text-white">Veera HR.</strong> All Rights
          Reserved. Developed by Evoqed
        </span>
        <span>
          <Link href="/privacy-policy" className="no-underline text-[#9aa2be] hover:text-white">Privacy Policy</Link>
          {" · "}
          <Link href="/terms-of-service" className="no-underline text-[#9aa2be] hover:text-white">Terms of Service</Link>
        </span>
      </div>
    </footer>
  );
}
