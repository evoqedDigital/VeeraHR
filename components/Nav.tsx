"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/job-portal", label: "Job Portal" },
  { href: "/countries", label: "Countries" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/Veera-HR-Brochure.pdf", label: "Profile" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[999] border-b border-white/70 bg-white/85 shadow-[0_8px_30px_rgba(17,24,39,0.08)] backdrop-blur-lg">
      <nav className="mx-auto flex h-[112px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-10">
        <Link href="/" className="flex items-center no-underline" onClick={() => setOpen(false)}>
          <div className="h-[102px] w-[360px] overflow-hidden">
            <Image
              src="/Color.png"
              alt="Veera HR Consultancy"
              width={760}
              height={210}
              className="h-[102px] w-auto shrink-0 scale-[3.3] origin-left"
              priority
            />
          </div>
        </Link>

        <ul className="hidden items-center gap-5 list-none min-[1200px]:flex xl:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                target={l.label === "Profile" ? "_blank" : undefined}
                rel={l.label === "Profile" ? "noopener noreferrer" : undefined}
                className={`text-[14px] font-medium no-underline transition-colors ${
                  isActive(pathname, l.href) ? "" : "text-[#333]"
                }`}
                style={isActive(pathname, l.href) ? { color: brand.primary } : { color: undefined }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:translate-y-[-1px] hover:shadow-[0_8px_20px_rgba(18,57,214,0.28)] min-[1200px]:inline-flex"
            style={{ backgroundColor: brand.primary }}
          >
            Partner With Us
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#eee] min-[1200px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-0.5 w-5 bg-[#333] transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-[#333] transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-[#333] transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#eee] bg-white/95 px-4 py-4 shadow-lg backdrop-blur min-[1200px]:hidden">
          <ul className="flex flex-col gap-0 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  target={l.label === "Profile" ? "_blank" : undefined}
                  rel={l.label === "Profile" ? "noopener noreferrer" : undefined}
                  className={`block border-b border-[#f5f5f5] py-3 text-sm font-medium no-underline ${
                    isActive(pathname, l.href) ? "" : "text-[#333]"
                  }`}
                  style={isActive(pathname, l.href) ? { color: brand.primary } : { color: undefined }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/contact"
                className="block rounded-[25px] py-2.5 text-center text-sm font-semibold text-white no-underline"
                style={{ backgroundColor: brand.primary }}
                onClick={() => setOpen(false)}
              >
                Partner With Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
