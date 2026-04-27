import Link from "next/link";
import { phoneUae, phoneUaeTel, siteName, year } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-zinc-900">
              Useful Pages
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              {siteName}, Trusted HR solutions provider with 21+ years of excellence, connecting
              businesses with top talent worldwide. Your partner in workforce success.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-zinc-900">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  className="text-brand hover:underline"
                  href="/privacy-policy/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-brand hover:underline" href="/terms-of-service">
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-brand hover:underline"
                  href="/legal-information/"
                >
                  Legal Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-zinc-900">
              Have any questions?
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              Call:{" "}
              <a className="font-medium text-brand" href={`tel:${phoneUaeTel}`}>
                {phoneUae}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500">
          <p>
            ©{year},{" "}
            <Link className="text-brand hover:underline" href="/">
              {siteName}.
            </Link>{" "}
            All Rights Reserved. Developed by{" "}
            <a
              className="text-brand hover:underline"
              href="https://evoqed.com/"
              rel="noreferrer"
              target="_blank"
            >
              Evoqed
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
