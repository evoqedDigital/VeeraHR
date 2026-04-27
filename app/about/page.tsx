import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Story, Mission & Vision",
  description:
    "Building success through vision, innovation, and trusted client partnerships since 2004.",
  openGraph: { title: "About Veera HR Consultancy" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Our Story"
        title={
          <>
            Building <span className="text-[#a89cff]">Success</span> Through Vision,
            <br />
            Innovation, And Trusted <span className="text-[#a89cff]">Client Partnerships</span>
          </>
        }
      />
      <section className="grid grid-cols-1 gap-10 px-4 py-14 sm:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-2 text-xs font-semibold tracking-wider text-[#6c63ff] uppercase">
            Who We Are
          </div>
          <h2 className="mb-4 text-2xl font-extrabold text-[#1a1a3e] sm:text-3xl">
            Empowering Businesses <span className="text-[#6c63ff]">Since 2004</span> With{" "}
            <span className="text-[#e53935]">Exceptional</span> HR Solutions
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-[#555]">
            At Veera HR Consultancy, we&apos;ve been empowering businesses and transforming lives since
            2004. We have partnered with leading organizations across industries to pioneer recruitment
            innovations that drive growth. With a commitment to integrity, innovation and excellence.
          </p>
          <p className="text-sm leading-relaxed text-[#555]">
            We connect exceptional talent including top-tier white-collar talents such as CEOs,
            Assistant CEOs, HR professionals, attorneys, and we&apos;ve skilled blue-collar workers such as
            technicians, welders, primary specialists, and other industry statutory manpower to ensure
            the future of work.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
            alt="Veera HR Team"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 px-4 py-10 sm:px-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#eee] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6c63ff]">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="mb-2 text-sm font-extrabold tracking-wide text-[#1a1a3e] uppercase">
            Our Mission
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-[#666]">
            Our mission is to provide businesses with a seamless hiring experience, ensuring they hire
            the right talent to achieve success. We help companies bridge significant gaps by connecting
            them with skilled professionals that match their needs.
          </p>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
              alt="Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-[#eee] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0eeff] text-[#6c63ff]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <h3 className="mb-2 text-sm font-extrabold tracking-wide text-[#1a1a3e] uppercase">
            Our Vision
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-[#666]">
            The mission is to build lasting relationships with our clients and partners. In today&apos;s
            fast-changing business environment, we are committed to understanding your needs and
            transcending your expectations.
          </p>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80"
              alt="Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="px-4 py-12 text-center sm:px-10">
        <h2 className="mb-1 text-2xl font-extrabold text-[#1a1a3e] sm:text-3xl">OUR CORE VALUES</h2>
        <p className="mb-8 text-sm text-[#666]">Driving businesses with expertise, innovation and vision</p>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              c: "from-pink-100 to-rose-50 border-pink-200",
              h: "Business Alignment",
              p: "Our drive ensures competitive tailored and proven results of excellence. Whether supporting business transformation or ensuring advanced operations, we are your trusted partner.",
            },
            {
              c: "from-blue-50 to-indigo-50 border-blue-200",
              h: "Data-Driven Decision",
              p: "The commitment is to always use strategic analysis to make informed workforce decisions that ensure efficient client results clearly.",
            },
            {
              c: "from-green-50 to-emerald-50 border-emerald-200",
              h: "Continuous Innovation",
              p: "We stay ahead of the curve by consistently updating our methods, technologies, and best practices to deliver superior results to our clients.",
            },
          ].map((v) => (
            <div
              key={v.h}
              className={`rounded-[14px] border bg-gradient-to-b p-6 text-left ${v.c}`}
            >
              <h4 className="mb-2 text-sm font-bold text-[#1a1a3e]">
                <span className="text-[#6c63ff]">#</span>
                {v.h}
              </h4>
              <p className="text-sm leading-relaxed text-[#666]">{v.p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-12 sm:px-10">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-block rounded-full border border-[#6c63ff] px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[#6c63ff] uppercase">
            Client Testimonials
          </div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Clients Share Their <span className="text-[#6c63ff]">Success Stories</span>
          </h2>
        </div>
        <div className="mx-auto max-w-[720px] rounded-[14px] bg-white p-8 shadow-md sm:p-10">
          <div className="mb-1 font-serif text-5xl text-[#f0eeff]">&quot;</div>
          <div className="mb-3 text-lg text-amber-500">★★★★★</div>
          <p className="mb-5 text-sm leading-relaxed text-[#555]">
            Veera HR Consultancy exceeded our expectations by providing us with highly qualified
            candidates who fit our company culture perfectly. Their attention to detail and commitment
            to excellence truly set them apart.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#6c63ff] to-[#a89cff] font-bold text-white">
              C
            </div>
            <div>
              <h4 className="text-sm font-bold">Cameron Williamson</h4>
              <span className="text-xs text-[#999]">CEO, Placeholder World</span>
            </div>
          </div>
        </div>
      </section>
      <CtaBand
        label="Empower Your Business"
        title="Ready To Transform\nYour Workforce?"
        href="/contact"
        button="Get Started Today →"
      />
    </>
  );
}
