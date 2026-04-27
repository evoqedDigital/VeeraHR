import Image from "next/image";
import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { CtaBand } from "@/components/CtaBand";
import { getHomeContent } from "@/lib/data/home";
import { getBlogPosts } from "@/lib/data/blog-posts";
import { HrProcessHomeSection } from "@/components/home/HrProcessHomeSection";
import { HomeOurServicesSection } from "@/components/home/HomeOurServicesSection";
import { OutsourceCountriesSection } from "@/components/home/OutsourceCountriesSection";
import { StatsSection } from "@/components/home/StatsSection";

const whyIcons = [
  <svg key="w1" className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
  <svg key="w2" className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
  <svg key="w3" className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="w4" className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
];

export async function HomePage() {
  const home = await getHomeContent();
  const blogPreview = (await getBlogPosts()).slice(0, 3);

  return (
    <>
      <section className="relative flex h-[min(580px,90vh)] items-center justify-center overflow-hidden px-4 sm:px-10" id="home">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={home.heroPoster}
        >
          {home.heroVideoSources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        <div className="relative z-[2] max-w-[660px] translate-y-8 text-center sm:translate-y-10">
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] text-balance text-white sm:text-[46px]">
            Your Global Partner For
            <br />
            Exceptional HR Solutions
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#after-callback"
              className="inline-block rounded-[25px] border-none bg-[#6c63ff] px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-all hover:translate-y-[-2px] hover:bg-[#5a52e0]"
            >
              Looking to hire?
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-[25px] border-none bg-[#e53935] px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-all hover:translate-y-[-2px] hover:bg-[#c62828]"
            >
              Get a callback
            </Link>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="grid min-h-[440px] grid-cols-1 md:grid-cols-2" id="about">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-14 sm:py-[70px]">
          <div className="mb-4 text-xs font-semibold tracking-[1.5px] text-[#888] uppercase">
            About Us
          </div>
          <h2 className="mb-6 text-3xl font-extrabold text-[#111] leading-tight sm:text-4xl">
            Your Trusted <span className="rounded bg-[#e53935] px-2 py-0.5 text-white">HR Partner</span> In
            <br />
            United Arab Emirates<span className="text-[#6c63ff]">.</span>
          </h2>
          <p className="mb-8 max-w-[380px] text-sm leading-relaxed text-[#555]">
            A business thrives when the right people are in the right roles. With over 21 years of
            experience and 20,000+ successful placements, we specialize in delivering customized HR
            solutions tailored to your unique needs. From connecting you with top-tier talent to
            streamlining workforce management and enhancing operational efficiency, we help your
            organization grow and succeed.
          </p>
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-2.5 rounded-[25px] bg-[#1a1a3e] px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#2d2d6e]"
          >
            Explore More
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e53935]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
        <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-[#6c63ff] to-[#a89cff] md:min-h-[440px]">
          <Image
            src={home.aboutImage}
            alt="HR Professional"
            fill
            className="object-cover object-top md:object-[50%_18%] opacity-85 mix-blend-luminosity"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div
            className="pointer-events-none absolute top-1/2 -left-8 h-[200px] w-[200px] -translate-y-1/2 rounded-full border-[3px] border-[rgba(108,99,255,0.6)]"
            aria-hidden
          />
        </div>
      </section>

      <OutsourceCountriesSection flags={home.outsourceCountryFlags} />
      <HomeOurServicesSection services={home.homeServices} />
      <HrProcessHomeSection steps={home.hrProcessSteps} />

      <section className="px-4 pt-20 pb-14 text-center sm:px-10">
        <div className="mb-5 inline-block rounded-full border border-[#6c63ff] px-5 py-1.5 text-[11px] font-semibold tracking-[2px] text-[#6c63ff] uppercase">
          Industries
        </div>
        <h2 className="mb-12 text-3xl font-extrabold sm:text-4xl">
          Outsourced Industry <span className="italic text-[#6c63ff]">Categories</span>
        </h2>
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {home.industries.map((ind) => (
            <div
              key={ind.title}
              className="group relative h-[200px] cursor-pointer overflow-hidden rounded-xl"
            >
              <Image
                src={ind.img}
                alt={ind.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.78)] to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 px-3.5 pb-3.5 text-left text-white">
                <div className="text-sm font-semibold">{ind.title}</div>
                <div className="mt-0.5 text-[11px] text-white/80">{ind.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 bg-[#f7f7ff] md:grid-cols-2">
        <div className="px-6 py-12 sm:px-14 sm:py-[70px]">
          <div className="mb-3 text-xs font-semibold tracking-[1.5px] text-[#888] uppercase">
            Why Choose Us
          </div>
          <h2 className="mb-3 text-2xl font-extrabold sm:text-[32px]">
            Why <span className="text-[#6c63ff]">Veera HR</span> Is Your
            <br />
            Compelling Choice
          </h2>
          <p className="mb-9 text-sm leading-relaxed text-[#666]">
            With 16+ years of expertise and a global network spanning 30+ countries, we deliver HR
            solutions that truly work for your business.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {home.whyFeatures.map((f, i) => (
              <div key={f.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#6c63ff]">
                  {whyIcons[i]}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{f.title}</h4>
                  <p className="text-xs leading-normal text-[#777]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[300px] md:min-h-[440px]">
          <Image
            src={home.whyImage}
            alt="Team meeting"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

      <CallbackForm />

      <section className="bg-[#fafafa] px-4 py-20 sm:px-10" id="after-callback">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-[#6c63ff] px-5 py-1.5 text-[11px] font-semibold tracking-[2px] text-[#6c63ff] uppercase">
            Testimonials
          </div>
          <h2 className="text-2xl font-extrabold sm:text-[34px]">
            Connect To The <span className="text-[#6c63ff]">HR Excellence</span>
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3">
          {home.testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-[14px] bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div
                className="pointer-events-none absolute top-4 right-4 font-serif text-[48px] leading-none text-[#f0eeff]"
                aria-hidden
              >
                &quot;
              </div>
              <div className="mb-3.5 text-base text-[#f5a623]">★★★★★</div>
              <p className="mb-5 text-[13px] leading-relaxed text-[#555]">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6c63ff] to-[#a89cff] text-base font-bold text-white">
                  {t.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{t.name}</h4>
                  <span className="text-xs text-[#999]">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f7ff] px-4 py-16 sm:px-10" id="blog">
        <div className="mb-11 text-center">
          <div className="mb-3 inline-block rounded-full border border-[#6c63ff] px-5 py-1.5 text-[11px] font-semibold tracking-[2px] text-[#6c63ff] uppercase">
            Latest News
          </div>
          <h2 className="text-2xl font-extrabold sm:text-[32px]">
            From Our <span className="text-[#6c63ff]">Blog</span>
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3">
          {blogPreview.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-transform hover:translate-y-[-4px]"
            >
              <div className="relative h-[170px]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div
                  className={`absolute top-3 left-3 min-w-[42px] rounded-lg px-2 py-1 text-center text-white ${
                    post.badge === "red" ? "bg-[#e53935]" : "bg-[#6c63ff]"
                  }`}
                >
                  <div className="text-lg font-extrabold leading-none">{post.day}</div>
                  <div className="text-[9px] font-bold tracking-wider uppercase">{post.month}</div>
                </div>
              </div>
              <div className="px-5 py-4 pb-6">
                <h3 className="mb-2 text-sm font-bold leading-snug text-[#1a1a3e]">{post.title}</h3>
                <p className="text-xs leading-relaxed text-[#888]">{post.excerpt}</p>
                <Link href={post.href} className="mt-2.5 inline-block text-xs font-semibold text-[#6c63ff] no-underline">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
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
