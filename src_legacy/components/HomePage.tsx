import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getAllPosts } from "@/lib/blog";
import { addressUae, phoneUae, phoneUaeTel, siteName } from "@/lib/site";

const stats = [
  { k: "20K+", t: "Placements" },
  { k: "97%", t: "Client Satisfaction" },
  { k: "150+", t: "Clients Worldwide" },
  { k: "21+", t: "Years Of Experience" },
] as const;

const industries = [
  "Facilities Management",
  "Security Services",
  "Cleaning Services",
  "Manufacturing",
  "Hotel & Hospitality",
  "Construction & Engineering",
  "Medical & Health Care",
  "Auto Mobile",
  "Oil & Gas",
  "FMCG",
] as const;

const whyChoose = [
  "Proven track record",
  "Tailored Solutions",
  "Unmatched Expertise",
  "Transparent pricing",
  "Legal employment",
  "Innovative and Agile",
] as const;

const countries = [
  "Nepal",
  "India",
  "Pakistan",
  "Bangladesh",
  "Srilanka",
  "Philippines",
  "Uganda",
  "Ghana",
] as const;

const services = [
  {
    title: "AC Technician",
    d: "Our AC Technician services ensure efficient installation, repair, and maintenance of air conditioning systems...",
  },
  {
    title: "Painter",
    d: "Our Painter services deliver professional and high-quality painting solutions for residential, commercial, and industr...",
  },
  {
    title: "Plumber",
    d: "Our Plumber services offer reliable solutions for all your plumbing needs, including installation, repair, and...",
  },
  {
    title: "Gardener",
    d: "Our Gardener services provide expert care for your gardens, ensuring healthy plants and beautiful landscapes...",
  },
  {
    title: "Cleaner",
    d: "Our Cleaner services provide efficient and thorough cleaning solutions, ensuring a spotless and hygienic ...",
  },
  {
    title: "Driver",
    d: "Our Driver services provide reliable, and efficient transportation solutions tailored to meet your specific needs.",
  },
  {
    title: "Delivery",
    d: "Our Delivery services ensure timely and secure transportation of goods to any destination. Whether for small packages or...",
  },
  {
    title: "Lifeguard",
    d: "Our Lifeguard services offer expert supervision and safety measures for aquatic environments. With certified profession...",
  },
] as const;

const processSteps = [
  { t: "Client's Demands", d: "Understanding and addressing the client's unique needs and expectations." },
  { t: "Registration & Profile Scan", d: "Efficient registration and thorough profile analysis to match the right opportunities." },
  { t: "Interviews", d: "Conducting in-depth interviews to assess skills and suitability for the role." },
  { t: "Offer Letter After Acceptance", d: "Issuing offer letters promptly after candidate acceptance for smooth onboarding." },
  { t: "Medical Tests & Visa Application", d: "Managing medical tests and handling visa applications for a seamless transition." },
  { t: "Flight Bookings", d: "Coordinating flight bookings for smooth and timely travel arrangements." },
  { t: "Orientation & Deployment of Candidate", d: "Conducting orientation and ensuring seamless deployment of candidates to their respective roles." },
] as const;

const testimonials = [
  {
    q: "We’ve worked with several HR firms, but Veera HR Consultancy stands out for their professionalism and efficiency. Their tailored recruitment strategies helped us find the right candidates quickly, saving us valuable time and resources.",
    a: "John Smith",
  },
  {
    q: "Veera HR Consultancy exceeded our expectations by providing us with highly qualified candidates who fit our company culture perfectly. Their attention to detail and commitment to excellence truly set them apart",
    a: "Cameron Williamson",
  },
  {
    q: "As an HR Manager, finding the right talent is crucial, and Veera HR made it so much easier. Their platform connects us with high-quality candidates quickly and efficiently, streamlining our hiring process.",
    a: "Sarah Williams",
  },
] as const;

export function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 to-brand/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">
            Quick Contact
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-balance">
            Your Global Partner for Exceptional HR Solutions
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/80">
            Address {addressUae}
            <br />
            Phone{" "}
            <a className="font-semibold text-white" href={`tel:${phoneUaeTel}`}>
              {phoneUae}
            </a>
          </p>
          <div className="mt-8">
            <Link
              href="#contact"
              className="inline-flex rounded-md bg-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-accent-light"
            >
              Get a callback
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" id="stats">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-2xl font-bold text-zinc-900 sm:text-3xl text-balance">
            Let&apos;s grow your business together with skilled talent
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.t}
                className="rounded-xl border border-zinc-100 bg-surface-muted p-4 text-center shadow-sm"
              >
                <p className="font-display text-2xl font-bold text-brand sm:text-3xl">{s.k}</p>
                <p className="mt-1 text-sm text-zinc-600">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-12 sm:py-16" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold uppercase tracking-wide text-brand">About Us</p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl text-balance">
            Your trusted HR partner in United Arab Emirates.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-zinc-600">
            A business thrives when the right people are in the right roles. With over 21 years of
            experience and 20,000+ successful placements, we specialize in delivering customized HR
            solutions tailored to your unique needs. From connecting you with top-tier talent to
            streamlining workforce management and enhancing operational efficiency, we help your
            organization grow and succeed.
          </p>
          <p className="mt-4 text-center text-sm font-medium text-zinc-700">
            Satisfied clients from 170+ organizations in different fields
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="industries">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
            Industries We Serve
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-500">Outsourced Industry Categories</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((name) => (
              <li
                key={name}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" id="outsourced">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl text-balance">
            Why top companies choose our outsourced manpower
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-zinc-600">
            At {siteName}, we are dedicated to delivering tailored HR solutions that align with your
            business needs. With a global presence and a proven track record, we specialize in
            connecting you with the right talent to drive success. Our expertise in recruitment,
            outsourcing, and workforce management ensures smooth operations, empowering your
            business to thrive in today’s competitive market. Choose {siteName} for reliable,
            efficient, and personalized HR services that make a real difference.
          </p>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-2 sm:grid-cols-2">
            {whyChoose.map((w) => (
              <li key={w} className="flex items-center gap-2 text-zinc-800">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {w}
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="#contact"
              className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-light"
            >
              Schedule an appointment
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-12 sm:py-16" id="countries">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
            Top countries we outsource from
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {countries.map((c) => (
              <span
                key={c}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold uppercase text-brand">Our Services</p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl text-balance">
            Delivering Tailored Solutions for Employers and Job Seekers with Excellence.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article
                key={s.title}
                className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-brand-dark">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-zinc-600">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16" id="process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl text-balance">
            Efficient. Seamless. Effective: Our Proven HR Process
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {processSteps.map((s, i) => (
              <li
                key={s.t}
                className="flex gap-3 rounded-lg border border-zinc-100 bg-surface-muted/60 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-zinc-900">{s.t}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{s.d}</p>
                </div>
              </li>
            ))}
            <li className="flex gap-3 rounded-lg border border-zinc-100 bg-surface-muted/60 p-4 md:col-span-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {processSteps.length + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-900">Feedback</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Collecting feedback to ensure continuous improvement and satisfaction for all
                  parties involved.
                </p>
              </div>
            </li>
            <li className="flex gap-3 rounded-lg border border-amber-100 bg-amber-50/50 p-4 md:col-span-2">
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-900">
                  Customer Satisfaction
                </h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Our priority at every step of the journey.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-surface-muted py-12 sm:py-16" id="testimonials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
            Clients Share Their Success Stories.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.a}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-zinc-600">&ldquo;{t.q}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-brand-dark">{t.a}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16" id="contact">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand">Get an Instant Callback</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-zinc-900 sm:text-3xl text-balance">
              Get in Touch for Seamless Hiring Solutions
            </h2>
            <p className="mt-2 text-sm text-zinc-600">Address {addressUae}</p>
            <p className="text-sm text-zinc-600">
              Phone{" "}
              <a className="font-medium text-brand" href={`tel:${phoneUaeTel}`}>
                {phoneUae}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-12 sm:py-16" id="blog">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-zinc-900 sm:text-3xl">
            Our Recent Blogs
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}/`}
                  className="block h-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-brand/40"
                >
                  <p className="text-xs font-semibold text-zinc-500">
                    {p.dateLabel.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-zinc-900">{p.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
