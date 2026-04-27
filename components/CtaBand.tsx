import Link from "next/link";

type CtaBandProps = {
  label: string;
  title: string;
  href: string;
  button: string;
};

export function CtaBand({ label, title, href, button }: CtaBandProps) {
  const normalizedTitle = title.replace(/\\n/g, " ").replace(/\n/g, " ");

  return (
    <div className="bg-[#f7f8ff] px-4 py-10 sm:px-10 sm:py-14">
      <div
        className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center"
        style={{
          background: "linear-gradient(130deg, #121633 0%, #1239D6 100%)",
        }}
      >
        <div>
          <div className="mb-2 text-xs font-semibold tracking-[2px] text-[#c4d0ff] uppercase">
            {label}
          </div>
          <h2 className="text-[26px] font-extrabold text-white leading-tight sm:text-[34px]">
            {normalizedTitle}
          </h2>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-[#1239D6] no-underline transition-all hover:translate-y-[-2px] hover:shadow-[0_10px_24px_rgba(255,255,255,0.28)] whitespace-nowrap"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}
