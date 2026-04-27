import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { getCountries } from "@/lib/data/countries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countries We Outsource From",
  openGraph: { title: "Global talent sourcing | Veera HR" },
};

const accent = [
  "from-violet-500/20 to-fuchsia-500/10",
  "from-cyan-500/15 to-blue-500/10",
  "from-amber-500/15 to-orange-500/10",
  "from-emerald-500/15 to-teal-500/10",
  "from-rose-500/15 to-pink-500/10",
  "from-sky-500/15 to-indigo-500/10",
  "from-lime-500/15 to-green-500/10",
  "from-[#6c63ff]/20 to-[#a89cff]/10",
] as const;

export default async function CountriesPage() {
  const countries = await getCountries();

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a18] px-4 py-16 text-white sm:px-10 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 20%, #6c63ff 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 80%, #a89cff 0%, transparent 45%)",
          }}
        />
        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#a89cff] uppercase">
            Global sourcing
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl sm:leading-tight">
            Where we find exceptional talent
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            Eight key markets, one trusted process — matching UAE employers with vetted teams across
            South Asia, Africa, and Southeast Asia.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f8f7ff] to-white px-4 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
          {countries.map((c, i) => (
            <article
              key={c.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_8px_30px_rgba(26,26,62,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(108,99,255,0.12)]"
            >
              <div
                className={`relative h-48 w-full overflow-hidden sm:h-52 bg-gradient-to-br ${accent[i % accent.length]}`}
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a18]/80 via-[#0a0a18]/20 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5">
                  <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {c.name}
                  </h2>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-[#555]">{c.description}</p>
                <p className="mt-4 text-xs font-bold tracking-[0.14em] text-[#6b63d8] uppercase">
                  {c.cityLabel ?? "Top cities we serve"}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.positions.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-[#f0eeff] px-2.5 py-0.5 text-[11px] font-semibold text-[#5a52c9]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        label="Next Step"
        title="Build Your Team\nAcross Borders"
        href="/contact"
        button="Talk to Our Team →"
      />
    </>
  );
}
