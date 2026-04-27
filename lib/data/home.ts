/**
 * HR / professional context: people in meetings, at the table, collaborating.
 * Pexels: meeting with charts (3246669), business meeting (6339834), team collab (7653214).
 */
export const HERO_VIDEO_SOURCES = [
  "/Ad-video.mp4",
] as const;

/** Still frame: team discussion / meeting (matches hero tone) */
export const HERO_POSTER =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80";

export const industries = [
  {
    title: "Construction",
    desc: "Skilled & general labour for infrastructure projects",
    img: "/assets/services/construction-worker.jpg",
  },
  {
    title: "Healthcare",
    desc: "Nurses, technicians & support staff",
    img: "/assets/services/Phantom-Rad-Tech-scaled.jpg",
  },
  {
    title: "Security",
    desc: "SIRA / PSBD licensed professionals",
    img: "/assets/services/portrait-male-security-guard-with-uniform.jpg",
  },
  {
    title: "Driving",
    desc: "Light & heavy vehicle operators",
    img: "/assets/services/man-working-as-truck-driver-posing.jpg",
  },
  {
    title: "Hospitality",
    desc: "Hotels, F&B, front-of-house",
    img: "/assets/services/Waitress-Taking-Orders-scaled-1-960x640.jpg",
  },
  {
    title: "IT",
    desc: "Engineers, support & infrastructure",
    img: "/assets/services/young-asian-businesswoman-manager-wearing-face-mask-warehouse-using-digital-tablet-checking-inventory.jpg",
  },
  {
    title: "Manufacturing",
    desc: "Assembly, production & quality",
    img: "/assets/services/cdw15-factory-imageweboptim.jpg",
  },
  {
    title: "Pharma",
    desc: "Qualified pharma & medical staff",
    img: "/assets/services/X-Ray-Technician-Course-Descriptions-XRay-Tech-Classes.webp",
  },
  {
    title: "Retail",
    desc: "Sales, merchandising & operations",
    img: "/assets/services/iStock-1217765325.jpg",
  },
  {
    title: "Cleaning",
    desc: "Commercial & facilities cleaning",
    img: "/assets/services/medium-shot-woman-cleaning-home.jpg",
  },
  {
    title: "Energy",
    desc: "Technicians & project support",
    img: "/assets/services/Welding.jpg",
  },
  {
    title: "Administration",
    desc: "Office, coordination & back-office",
    img: "/assets/services/companyadministrationfaqs_140073595.jpg",
  },
] as const;

/** Homepage “Our Services” — trade & facility roles (match client design). */
export const homeServices: readonly {
  title: string;
  body: string;
  /** Slightly stronger card (e.g. featured role) */
  highlight?: boolean;
}[] = [
  {
    title: "AC Technician",
    body: "Installation, repair, and maintenance of air conditioning systems for homes and commercial spaces.",
  },
  {
    title: "Painter",
    body: "High-quality interior and exterior painting for residential, commercial, and industrial projects.",
  },
  {
    title: "Plumber",
    body: "Reliable solutions for all plumbing needs — repairs, installations, and system upkeep.",
  },
  {
    title: "Gardener",
    body: "Expert care for gardens, green spaces, and healthy plants across the seasons.",
  },
  {
    title: "Cleaner",
    body: "Efficient, thorough cleaning for a spotless environment — offices, sites, and facilities.",
    highlight: true,
  },
  {
    title: "Driver",
    body: "Reliable, efficient driving support for your transport and logistics requirements.",
  },
  {
    title: "Delivery",
    body: "Timely, secure delivery and transport of goods where you need them.",
  },
  {
    title: "Lifeguard",
    body: "Professional supervision and safety for swimming pools, beaches, and aquatic facilities.",
  },
] as const;

/** Flag strip: ISO 3166-1 alpha-2 for flagcdn. Label “Srilanka” as in client mockup. */
export const OUTSOURCE_COUNTRY_FLAGS: readonly { code: string; label: string }[] = [
  { code: "np", label: "Nepal" },
  { code: "in", label: "India" },
  { code: "pk", label: "Pakistan" },
  { code: "bd", label: "Bangladesh" },
  { code: "lk", label: "Srilanka" },
  { code: "ph", label: "Philippines" },
  { code: "ug", label: "Uganda" },
  { code: "gh", label: "Ghana" },
] as const;

/** “Our proven HR process” — left column then right column in design. */
export const HR_PROCESS_STEPS: readonly { title: string; body: string }[] = [
  {
    title: "Client's Demands",
    body: "Understanding and addressing the client's unique needs and expectations.",
  },
  {
    title: "Interviews",
    body: "In-depth interviews to assess skills and suitability for the role.",
  },
  {
    title: "Medical Tests & Visa Application",
    body: "Managing medical tests and visa applications for a seamless transition.",
  },
  {
    title: "Orientation & Deployment of Candidate",
    body: "Orientation and seamless deployment of candidates to their roles.",
  },
  {
    title: "Registration & Profile Scan",
    body: "Efficient registration and profile analysis to match the right opportunities.",
  },
  {
    title: "Offer Letter After Acceptance",
    body: "Issuing offer letters promptly after acceptance for smooth onboarding.",
  },
  {
    title: "Flight Bookings",
    body: "Coordinating flight bookings for smooth, timely travel arrangements.",
  },
  {
    title: "Feedback",
    body: "Collecting feedback to drive continuous improvement and satisfaction for everyone involved.",
  },
] as const;

export const whyFeatures = [
  {
    title: "Trusted & Reliable",
    body: "Over two decades of successful placements across the GCC region.",
  },
  {
    title: "Global Network",
    body: "Talent sourcing from 30+ countries worldwide for any role.",
  },
  {
    title: "Expert Team",
    body: "Seasoned HR consultants with industry-specific expertise.",
  },
  {
    title: "Fast Turnaround",
    body: "Rapid talent matching with quality never compromised.",
  },
] as const;

export const testimonials = [
  {
    initial: "A",
    name: "Ahmed Al-Rashidi",
    role: "Director, Al-Rashidi Group",
    quote:
      "Veera HR has been an exceptional partner in helping us source skilled professionals for our construction projects in Dubai. Their team is professional, responsive, and truly understands our needs.",
  },
  {
    initial: "S",
    name: "Sarah Mitchell",
    role: "HR Manager, Grand Stays Hotels",
    quote:
      "We've worked with Veera HR for 3 years and they've consistently delivered top talent for our hospitality chain. Their global network is truly impressive and the quality of candidates is outstanding.",
  },
  {
    initial: "R",
    name: "Rajan Nair",
    role: "CEO, TechBridge Solutions",
    quote:
      "The PRO services and visa processing through Veera HR saved us significant time and hassle. They know the UAE regulations inside-out and made our entire recruitment process seamless.",
  },
] as const;

export const aboutImage =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80";
export const whyImage =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80";

export type HomeContent = {
  heroVideoSources: readonly string[];
  heroPoster: string;
  industries: readonly { title: string; desc: string; img: string }[];
  homeServices: readonly { title: string; body: string; highlight?: boolean }[];
  outsourceCountryFlags: readonly { code: string; label: string }[];
  hrProcessSteps: readonly { title: string; body: string }[];
  whyFeatures: readonly { title: string; body: string }[];
  testimonials: readonly { initial: string; name: string; role: string; quote: string }[];
  aboutImage: string;
  whyImage: string;
};

export async function getHomeContent(): Promise<HomeContent> {
  const base: HomeContent = {
    heroVideoSources: HERO_VIDEO_SOURCES,
    heroPoster: HERO_POSTER,
    industries,
    homeServices,
    outsourceCountryFlags: OUTSOURCE_COUNTRY_FLAGS,
    hrProcessSteps: HR_PROCESS_STEPS,
    whyFeatures,
    testimonials,
    aboutImage,
    whyImage,
  };
  const { readCmsContent } = await import("@/lib/cms/store");
  const cms = await readCmsContent();
  const home = (cms.home ?? {}) as Partial<HomeContent>;
  return {
    ...base,
    ...home,
    heroVideoSources: Array.isArray(home.heroVideoSources) ? home.heroVideoSources : base.heroVideoSources,
    industries: Array.isArray(home.industries) ? home.industries : base.industries,
    homeServices: Array.isArray(home.homeServices) ? home.homeServices : base.homeServices,
    outsourceCountryFlags: Array.isArray(home.outsourceCountryFlags)
      ? home.outsourceCountryFlags
      : base.outsourceCountryFlags,
    hrProcessSteps: Array.isArray(home.hrProcessSteps) ? home.hrProcessSteps : base.hrProcessSteps,
    whyFeatures: Array.isArray(home.whyFeatures) ? home.whyFeatures : base.whyFeatures,
    testimonials: Array.isArray(home.testimonials) ? home.testimonials : base.testimonials,
    aboutImage: typeof home.aboutImage === "string" ? home.aboutImage : base.aboutImage,
    whyImage: typeof home.whyImage === "string" ? home.whyImage : base.whyImage,
    heroPoster: typeof home.heroPoster === "string" ? home.heroPoster : base.heroPoster,
  };
}
