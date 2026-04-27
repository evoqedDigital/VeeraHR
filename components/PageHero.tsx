import type { ReactNode } from "react";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  subtitle?: string;
};

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden px-4 py-14 text-center text-white sm:px-10 sm:py-[78px]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #161633 0%, #1239D6 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22), transparent 35%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.18), transparent 30%)",
        }}
      />
      <div className="relative z-[1]">
        <div className="mb-3 text-xs font-semibold tracking-[2px] text-[#cbd5ff] uppercase">{label}</div>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-[42px]">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/80">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
