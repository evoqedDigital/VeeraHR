import Link from "next/link";
import { tradeServiceIcons } from "./TradeServiceIcons";

type HomeService = { title: string; body: string; highlight?: boolean };

export function HomeOurServicesSection({ services }: { services: readonly HomeService[] }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-10 sm:py-20" id="services">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mb-3 text-center text-sm font-bold tracking-wide text-[#e53935]">Our Services</p>
        <h2 className="text-balance text-2xl font-extrabold text-[#111] sm:text-3xl sm:leading-tight">
          Delivering{" "}
          <span className="inline-block rounded-sm bg-[#e53935] px-1.5 py-0.5 text-white sm:px-2.5 sm:py-1">
            Tailored Solutions
          </span>{" "}
          For Employers And
          <br className="hidden sm:block" /> Job Seekers With Excellence.
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={[
              "rounded-2xl border border-[#e0dbff] p-5 text-left transition-shadow hover:shadow-[0_8px_28px_rgba(108,99,255,0.2)]",
              s.highlight
                ? "bg-[#c9c0ff] shadow-[0_2px_12px_rgba(108,99,255,0.2)]"
                : "bg-[#e8e4ff]/90",
            ].join(" ")}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-start [&>svg]:h-7 [&>svg]:w-7">
              {tradeServiceIcons[i]}
            </div>
            <h3 className="mb-1.5 text-[15px] font-bold text-[#1a1a2e]">{s.title}</h3>
            <p className="text-xs leading-relaxed text-[#4a4a5c] sm:text-[13px]">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-3 rounded-full bg-[#6c63ff] px-8 py-3.5 text-sm font-bold text-white no-underline transition hover:bg-[#5a52e0]"
        >
          Browse All Services
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e53935] text-white" aria-hidden>
            <svg className="h-3.5 w-3.5 -translate-y-0.5 translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
