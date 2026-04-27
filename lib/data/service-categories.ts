export type ServiceCategory = {
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Security",
    description:
      "Our security services provide reliable protection for residential and commercial properties.",
    image: "/assets/services/portrait-male-security-guard-with-uniform.jpg",
  },
  {
    title: "House Keeping",
    description:
      "Our housekeeping services ensure clean, organized, and well-maintained spaces for homes and businesses.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
    imagePosition: "50% 40%",
  },
  {
    title: "Cleaner",
    description:
      "Our cleaning services provide thorough and professional cleaning for homes, offices, and commercial spaces.",
    image: "/assets/services/smiling-young-handsome-cleaning-guy-wearing-t-shirt-cap-holding-bucket-cleaning-tools-with-mop-isolated-white-wall.jpg",
  },
  {
    title: "Driver",
    description:
      "Our Driver services provide reliable and professional transportation solutions tailored to your needs .",
    image: "/assets/services/man-working-as-truck-driver-posing.jpg",
  },
  {
    title: "Lifeguard",
    description:
      "Our Lifeguard services offer expert supervision and safety measures for aquatic environments.",
    image: "/assets/services/side-view-lifeguard-sitting-chair.jpg",
  },
  {
    title: "Delivery",
    description:
      "Our Delivery services ensure timely and secure transportation of goods to any destination.",
    image: "/assets/services/delivery-male-with-mask-packages.jpg",
  },
  {
    title: "AC Technician",
    description:
      "Our AC Technician services ensure efficient installation, repair, and maintenance of air conditioning systems.",
    image: "/assets/services/team-replacing-old-air-conditioner.jpg",
  },
  {
    title: "Electrician",
    description:
      "Our electrician services provide safe and reliable electrical installation, maintenance, and repair solutions for residential and commercial properties.",
    image: "/assets/services/male-electrician-checking-switchboard-basement.jpg",
    imagePosition: "50% 35%",
  },
  {
    title: "Plumber",
    description:
      "Our Plumber services offer reliable solutions for all your plumbing needs, including installation and, repair.",
    image: "/assets/services/plumbing-professional-doing-his-job.jpg",
  },
  {
    title: "Mason",
    description:
      "Our masonry services include expert brickwork, stonework, and concrete solutions for residential and commercial projects.",
    image: "/assets/services/1440_skillenhancementdiversificationtrainingofwomenmason-sankhu_-_v2.jpg",
  },
  {
    title: "Carpenter",
    description:
      "Our carpentry services cover custom woodwork, furniture making, and structural installations.",
    image: "/assets/services/carpenter-working-house.jpg",
  },
  {
    title: "Painter",
    description:
      "Our painting services include interior and exterior painting for residential and commercial spaces.",
      image: "/assets/services/young-couple-doing-apartment-repair-together-themselves-married-man-woman-doing-home-makeover-renovation-concept-relations-family-love-painting-wall-together-laughting.jpg",
  },
  {
    title: "Gardener",
    description:
      "Our Gardener services provide expert care for your gardens, ensuring healthy plants and beautiful landscapes.",
    image: "/assets/services/portrait-professional-gardener-holding-trimmer-working-yard.jpg",
  },
  {
    title: "Landscaper",
    description:
      "Our landscaping services include garden design, lawn care, and outdoor maintenance for residential and commercial properties.",
    image: "/assets/services/pensive-middle-aged-gardener-holding-small-thuja-pot-bearded-garden-worker-glasses-wearing-blue-shirt-apron-growing-evergreen-plants-greenhouse-commercial-gardening-summer-concept.jpg",
  },
  {
    title: "General helper",
    description:
      "Our general helper services provide a wide range of assistance, from basic repairs to home organization and event setup.",
    image: "/assets/services/construction-worker.jpg",
    imagePosition: "50% 38%",
  },
  {
    title: "Construction Helper",
    description:
      "Our construction helper services offer support for various construction tasks, including material handling, site preparation.",
    image: "/assets/services/construction-worker.jpg",
  },
  {
    title: "Construction Mason",
    description:
      "Our construction mason services specialize in brickwork, stone masonry, and concrete structures.",
    image: "/assets/services/1440_skillenhancementdiversificationtrainingofwomenmason-sankhu_-_v2.jpg",
  },
  {
    title: "Steel Fixer",
    description:
      "Our steel fixer services involve the installation and reinforcement of steel bars and mesh for concrete structures.",
    image: "/assets/services/Hinkley-Bylor-steel-fixer-tying-steel-on-Pump-House-Raft..jpg",
  },
  {
    title: "Shuttering Carpenter",
    description:
      "Our shuttering carpenter services provide expert formwork for concrete structures, including the design and installation of molds for beams, columns, slabs, and foundations.",
    image: "/assets/services/Shuttering-Carpenter.jpg",
  },
  {
    title: "Aluminium fabricator",
    description:
      "Our aluminium fabrication services include custom designs and installations for windows, doors, and structural components.",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=900&q=80",
    imagePosition: "50% 45%",
  },
  {
    title: "Welder",
    description:
      "Our welding services provide high-quality metal joining solutions for both residential and commercial projects.",
    image: "/assets/services/Welding.jpg",
  },
  {
    title: "Mechanic",
    description:
      "Our mechanic services include vehicle diagnostics, repairs, and maintenance for all types of cars and trucks.",
    image: "/assets/services/mecha.jpg",
  },
  {
    title: "Cook",
    description:
      "Our cook services provide delicious, home-style meals for individuals, families, and events.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80",
    imagePosition: "50% 45%",
  },
  {
    title: "Waiter/Waitress",
    description:
      "Our waiter/waitress services provide professional and courteous staff to ensure excellent service at events, restaurants, and private functions.",
    image: "/assets/services/Waitress-Taking-Orders-scaled-1-960x640.jpg",
  },
  {
    title: "Kitchen Helper/Dish Washer",
    description:
      "Our kitchen helper and dishwashing services offer efficient support in food preparation, cleaning, and maintaining a hygienic kitchen environment.",
    image: "/assets/services/how-to-manage-small-restaurant-business-dishwasher.jpg",
  },
  {
    title: "Tailor",
    description:
      "Our tailoring services provide custom clothing alterations, repairs, and bespoke designs for men, women, and children, ensuring a perfect fit and style.",
    image: "/assets/services/how-to-become-a-tailor.webp",
  },
  {
    title: "Cutting Master",
    description:
      "Our cutting master services specialize in precise fabric cutting for custom clothing and garments.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&q=80",
    imagePosition: "50% 40%",
  },
  {
    title: "Helper Checker / Helper",
    description:
      "Our checker/helper services provide support in quality control, inspection, and general assistance across various tasks.",
    image: "/assets/services/cdw15-factory-imageweboptim.jpg",
  },
  {
    title: "Health & safety engineer",
    description:
      "Our health and safety engineer services ensure the safety and well-being of employees and clients in the workplace.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80",
    imagePosition: "50% 36%",
  },
  {
    title: "Administration",
    description: "Our administration services provide efficient support in managing office operations.",
    image: "/assets/services/1Becoming-an-administrator-1.jpg",
  },
  {
    title: "Call center agent",
    description:
      "Our call center agent services provide professional customer support through inbound and outbound calls.",
    image: "/assets/services/call-center-skills-for-agent-success-banner.jpeg",
  },
  {
    title: "Nurse",
    description:
      "Our nurse services offer professional healthcare support, including patient care, and medical assistance,",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80",
    imagePosition: "50% 35%",
  },
  {
    title: "X-ray technician",
    description: "Our X-ray technician services provide high-quality imaging for medical diagnosis.",
    image: "/assets/services/X-Ray-Technician-Course-Descriptions-XRay-Tech-Classes.webp",
  },
];

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const { readCmsContent } = await import("@/lib/cms/store");
  const cms = await readCmsContent();
  if (!Array.isArray(cms.services)) return SERVICE_CATEGORIES;
  return cms.services as ServiceCategory[];
}
