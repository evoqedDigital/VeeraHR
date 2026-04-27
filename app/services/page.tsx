import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { getServiceCategories } from "@/lib/data/service-categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Expert HR and Staffing Solutions",
  openGraph: { title: "HR & Staffing Services | Veera HR" },
};

export default async function ServicesPage() {
  const services = await getServiceCategories();

  return (
    <>
      <div className="px-4 py-14 text-center sm:px-10 sm:py-[60px]">
        <h1 className="text-3xl font-extrabold text-[#1a1a3e] sm:text-[38px]">
          Expert HR And <span className="italic text-[#6c63ff]">Staffing Solutions</span>
        </h1>
      </div>
      <section className="px-4 pb-20 sm:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:translate-y-[-4px] hover:shadow-[0_10px_36px_rgba(108,99,255,0.15)]"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-center transition-transform duration-300 hover:scale-[1.06]"
                  style={{ objectPosition: s.imagePosition ?? "50% 50%" }}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 text-[15px] font-bold text-[#1a1a3e]">{s.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#777]">{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand
        label="Work With Us"
        title="Ready To Transform\nYour Workforce?"
        href="/contact"
        button="Get Started Today →"
      />
    </>
  );
}
