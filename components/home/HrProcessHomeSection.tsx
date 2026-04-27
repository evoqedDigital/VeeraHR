import type { ReactNode } from "react";
import Link from "next/link";
type ProcessStep = { title: string; body: string };

const icons: ReactNode[] = [
  <svg key="0" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M7 8l1 1.5L11 5" />
  </svg>,
  <svg key="1" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="3" width="8" height="6" rx="1" />
    <path d="M12 6h1a3 3 0 0 1 3 3" />
    <line x1="2" y1="22" x2="2" y2="20" />
    <path d="M2 20v-3a2 2 0 0 1 2-2h3" />
  </svg>,
  <svg key="2" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 12.5C5 7 7 3 8 2l.5.5" />
    <path d="M4.5 12.5a8 8 0 0 0 3 2.5" />
    <path d="M8 2c2.5.5 5 2 5.5 2.5" />
    <circle cx="16" cy="5" r="1.5" fill="#2563eb" />
  </svg>,
  <svg key="3" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v2M4 6h2M4 10h2M4 14h2" />
    <path d="M6 4v4h2l3 2v4l-2 1H6" />
    <path d="M6 8v2h.5" />
  </svg>,
  <svg key="4" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="4" width="12" height="14" rx="1" />
    <line x1="8" y1="8" x2="10" y2="8" />
    <line x1="8" y1="12" x2="12" y2="12" />
    <circle cx="17" cy="7" r="2.5" />
    <line x1="15" y1="10" x2="18.5" y2="13" />
  </svg>,
  <svg key="5" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="5" y="2" width="12" height="16" rx="1" />
    <path d="M9 6h4M9 9h2" />
    <path d="M7 20l1-2h6l1 2" />
    <path d="M9 10l1.5 1.5L12 9" />
  </svg>,
  <svg key="6" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12h8l-2-3 2-3H2" />
    <path d="M10 6l2 3-2 3" />
  </svg>,
  <svg key="7" className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 3h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <circle cx="8" cy="8" r="0.6" fill="#2563eb" />
    <circle cx="12" cy="8" r="0.6" fill="#2563eb" />
    <circle cx="16" cy="8" r="0.6" fill="#2563eb" />
  </svg>,
];

function ProcessColumn({ items, startIndex }: { items: ProcessStep[]; startIndex: number }) {
  return (
    <div className="flex flex-col gap-8 sm:gap-9">
      {items.map((step, j) => {
        const i = startIndex + j;
        return (
          <div key={step.title} className="flex gap-3.5 sm:gap-4">
            <div className="pt-0.5">{icons[i]}</div>
            <div>
              <h3 className="mb-1.5 text-[15px] font-bold text-[#111]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#666]">{step.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function HrProcessHomeSection({ steps }: { steps: readonly ProcessStep[] }) {
  const left = steps.slice(0, 4);
  const right = steps.slice(4, 8);
  return (
    <section className="relative overflow-hidden bg-[#f3f1f7] px-4 py-14 sm:px-10 sm:py-20" aria-labelledby="hr-process-heading">
      {/* Red glow — behind first column on larger screens */}
      <div
        className="pointer-events-none absolute top-1/2 left-0 h-[min(100%,600px)] w-[min(55%,320px)] -translate-y-1/2 opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(ellipse, rgba(229, 57, 53, 0.5) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <h2
          id="hr-process-heading"
          className="text-center text-lg font-extrabold tracking-tight text-[#111] uppercase sm:text-2xl sm:leading-tight"
        >
          Efficient. Seamless. Effective: our proven HR process
        </h2>
        <div className="mx-auto mt-5 flex max-w-3xl items-center justify-center gap-1 px-2">
          <div className="h-0.5 flex-1 bg-[#e53935]" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#e53935]" aria-hidden />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 md:grid-cols-2 md:gap-14">
          <ProcessColumn items={[...left]} startIndex={0} />
          <ProcessColumn items={[...right]} startIndex={4} />
        </div>

        <div className="mt-10 flex justify-center sm:mt-12 md:justify-start">
          <Link
            href="#callback"
            className="inline-flex items-center gap-1 rounded-md bg-[#e53935] px-6 py-3 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-[#c62828]"
          >
            Hire Today
            <span aria-hidden> &gt;&gt; </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
