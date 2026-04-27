import Link from "next/link";
import { phoneUae, phoneUaeTel } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="bg-brand-dark py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-200/90">
          Empower Your Business
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          Ready to Transform Your Workforce?
        </h2>
        <p className="mt-3 text-balance text-white/85">
          Veera HR, Trusted HR solutions provider with 21+ years of excellence, connecting
          businesses with top talent worldwide. Your partner in workforce success.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="tel:+97142889597"
            className="w-full max-w-xs rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-brand-dark transition hover:bg-zinc-100 sm:w-auto"
          >
            Call {phoneUae}
          </Link>
          <a
            href={`tel:${phoneUaeTel}`}
            className="text-sm text-white/90 underline decoration-white/30 underline-offset-2 hover:decoration-white"
          >
            {phoneUae}
          </a>
        </div>
      </div>
    </section>
  );
}
