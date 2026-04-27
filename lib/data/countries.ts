export type CountryRow = {
  name: string;
  description: string;
  image: string;
  positions: string[];
  cityLabel?: string;
  imageLeft: boolean;
};

export const COUNTRIES: CountryRow[] = [
  {
    name: "Nepal",
    description:
      "Nepal provides a dedicated and reliable workforce across multiple industries. We connect businesses with skilled Nepali talent to support long-term staffing success.",
    image: "https://flagcdn.com/w640/np.png",
    positions: ["Rupandehi", "Jhapa", "Kathmandu", "Pokhara"],
    cityLabel: "Top cities we serve",
    imageLeft: true,
  },
  {
    name: "India",
    description:
      "India offers a diverse, skilled workforce across industries like IT, healthcare, and hospitality. We connect businesses with top Indian talent to meet global staffing needs efficiently and effectively.",
    image: "https://flagcdn.com/w640/in.png",
    positions: ["Delhi", "Tamil Nadu", "Kerala"],
    cityLabel: "Top cities we serve",
    imageLeft: false,
  },
  {
    name: "Pakistan",
    description:
      "Pakistan offers a hardworking and reliable workforce skilled in industries like construction, agriculture, and textiles. We connect businesses with Pakistan's top talent to meet global staffing needs.",
    image: "https://flagcdn.com/w640/pk.png",
    positions: ["Karachi", "Lahore", "Islamabad"],
    cityLabel: "Top cities we serve",
    imageLeft: true,
  },
  {
    name: "Srilanka",
    description:
      "Sri Lanka, an island nation in the Indian Ocean, offers a skilled workforce and a growing economy, making it an ideal destination for HR services.",
    image: "https://flagcdn.com/w640/lk.png",
    positions: ["Colombo", "Kandy", "Galle"],
    cityLabel: "Top cities we serve",
    imageLeft: false,
  },
  {
    name: "Uganda",
    description:
      "Uganda, located in East Africa, offers a growing economy and a youthful, skilled workforce, making it an emerging destination for HR services and business outsourcing.",
    image: "https://flagcdn.com/w640/ug.png",
    positions: ["Kampala", "Entebbe", "Jinja"],
    cityLabel: "Top cities we serve",
    imageLeft: true,
  },
  {
    name: "Ghana",
    description:
      "Ghana, situated in West Africa, is known for its stable economy and vibrant workforce, making it an attractive location for HR services and business outsourcing.",
    image: "https://flagcdn.com/w640/gh.png",
    positions: ["Accra", "Kumasi", "Tema"],
    cityLabel: "Top cities we serve",
    imageLeft: false,
  },
  {
    name: "bangladesh",
    description:
      "Bangladesh, located in South Asia, boasts a young, dynamic workforce and a growing economy, making it a key destination for HR services and outsourcing.",
    image: "https://flagcdn.com/w640/bd.png",
    positions: ["Dhaka", "Chittagong", "Sylhet"],
    cityLabel: "Top cities we serve",
    imageLeft: true,
  },
  {
    name: "Philippines",
    description:
      "The Philippines, an archipelago in Southeast Asia, is known for its English-speaking, highly skilled workforce, making it a prime destination for HR services and outsourcing solutions.",
    image: "https://flagcdn.com/w640/ph.png",
    positions: ["Manila", "Cebu City", "Davao"],
    cityLabel: "Top cities we source from",
    imageLeft: false,
  },
];

export async function getCountries(): Promise<CountryRow[]> {
  const { readCmsContent } = await import("@/lib/cms/store");
  const cms = await readCmsContent();
  if (!Array.isArray(cms.countries)) return COUNTRIES;
  return cms.countries as CountryRow[];
}
