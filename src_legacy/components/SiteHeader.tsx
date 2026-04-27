import Link from "next/link";
import { siteName } from "@/lib/site";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#industries", label: "Industries" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
  { href: "/#blog", label: "Blog" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-dark/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight sm:text-xl">
          {siteName}
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="tel:+97142889597"
            className="hidden rounded-md border border-white/20 px-3 py-1.5 text-sm font-medium text-white/95 transition hover:bg-white/10 sm:inline"
          >
            Call
          </Link>
          <Link
            href="/#contact"
            className="rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-brand-dark transition hover:bg-accent-light sm:px-4"
          >
            Get a callback
          </Link>
        </div>
      </div>
    </header>
  );
}
