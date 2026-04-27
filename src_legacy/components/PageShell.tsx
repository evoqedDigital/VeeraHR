import { CtaSection } from "@/components/CtaSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SubpageTopBar } from "@/components/SubpageTopBar";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
  showAwardsLine?: boolean;
};

export function PageShell({
  children,
  eyebrow,
  title,
  intro,
  lastUpdated,
  showAwardsLine = true,
}: PageShellProps) {
  return (
    <>
      <SubpageTopBar />
      <div className="bg-gradient-to-b from-amber-50/40 to-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {eyebrow && (
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-amber-900/80">
              {eyebrow}
            </p>
          )}
          {showAwardsLine && (
            <p className="mt-1 text-center text-sm text-zinc-600">
              Our company has been honored with awards for excellence, innovation, and outstanding
              business achievements.
            </p>
          )}
          <h1 className="mt-6 text-center font-display text-3xl font-bold text-brand-dark sm:text-4xl text-balance">
            {title}
          </h1>
          {lastUpdated && <p className="mt-3 text-center text-sm text-zinc-500">Last Updated: {lastUpdated}</p>}
          {intro && <p className="prose-legal mt-6 text-pretty text-zinc-600">{intro}</p>}
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="prose-legal max-w-none space-y-3">{children}</div>
        </div>
      </div>
      <CtaSection />
      <SiteFooter />
    </>
  );
}
