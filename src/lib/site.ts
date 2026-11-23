import mep from "@/assets/mep.jpg";
import insulation from "@/assets/insulation.jpg";
import cladding from "@/assets/cladding.jpg";
import fireline from "@/assets/fireline.jpg";
import hvac from "@/assets/hvac.jpg";
import manpower from "@/assets/manpower.jpg";
import scaffolding from "@/assets/scaffolding.jpg";
import welding from "@/assets/welding.jpg";

export const company = {
  name: "ISHAAN Enterprises",
  proprietor: "Ishaan Maurya",
  phone: "8169052262",
  phoneDisplay: "+91 81690 52262",
  email: "ishaanenterprises05@gmail.com",
  address: "A1 703, Rutu Estate, Patlipada, Thane West, Maharashtra 400607",
};

export const proprietorProfile = {
  name: "Ishaan Maurya",
  role: "Founder & Proprietor | ISHAAN Enterprises",
  tagline: "Driven by Engineering. Inspired by Excellence.",
  bio: [
    "Ishaan Maurya is the Founder and Proprietor of ISHAAN Enterprises, bringing together an engineering background and an entrepreneurial vision to deliver dependable industrial solutions.",
    "With academic qualifications in Mechanical Engineering and a Bachelor's degree in Marine Engineering, he brings a strong technical foundation and a practical understanding of engineering operations, industrial systems and project execution.",
    "Under his leadership, ISHAAN Enterprises is focused on delivering quality-driven solutions across industrial insulation, HVAC, fabrication, maintenance and manpower services.",
    "His leadership philosophy is built on integrity, technical excellence, safety and lasting client relationships, with a vision to establish ISHAAN Enterprises as a trusted industrial solutions partner across India.",
  ],
  quote: "Building beyond expectations through engineering excellence, commitment and trust.",
};

export const parentCompany = {
  name: "Mahendra Insulation Services",
  founder: "Mahendra Maurya",
  since: "1980s",
  story:
    "Founded by Mahendra Maurya in the 1980s, Mahendra Insulation Services built its name on dependable thermal insulation work for boilers, pipelines and process plants. Decades of trusted client relationships and hard-earned site experience form the foundation on which ISHAAN Enterprises stands today.",
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "mep-works",
    title: "MEP Works",
    short: "Mechanical, electrical and plumbing installations under one coordinated team.",
    description:
      "We plan, install and commission mechanical, electrical and plumbing systems for industrial plants, commercial buildings and infrastructure projects — coordinated so every trade fits together on site.",
    points: ["Piping & plumbing networks", "Cable trays & electrical routing", "Pump & equipment installation", "Testing & commissioning"],
    image: mep,
  },
  {
    slug: "boiler-insulation",
    title: "Boiler Hot / Cold Insulation",
    short: "Thermal and cryogenic insulation that cuts energy loss and protects people.",
    description:
      "Hot and cold insulation for boilers, pipelines, tanks and vessels using mineral wool, PUF, nitrile and glass wool — finished with aluminium or SS jacketing for long life.",
    points: ["Boiler & steam line insulation", "Chilled water & cold insulation", "Aluminium / SS jacketing", "Repair & re-insulation"],
    image: insulation,
  },
  {
    slug: "sheet-metal-cladding",
    title: "Sheet Metal Cladding",
    short: "Clean, weather-tight metal cladding for walls, roofs and equipment.",
    description:
      "Profiled and flat sheet cladding for industrial sheds, equipment and insulated surfaces — precisely cut, fixed and sealed for a neat, durable finish.",
    points: ["Roof & wall cladding", "Equipment cladding", "Flashing & trims", "Galvalume / aluminium / SS sheets"],
    image: cladding,
  },
  {
    slug: "fireline-frp-lining",
    title: "Fireline Fabrication / FRP Lining",
    short: "Fire-fighting pipelines and corrosion-proof FRP lining.",
    description:
      "Fabrication and erection of fire hydrant and sprinkler lines, plus FRP lining of tanks, trenches and vessels to resist chemicals and corrosion.",
    points: ["Hydrant & sprinkler pipelines", "Fire line erection & testing", "FRP tank & trench lining", "Chemical-resistant coatings"],
    image: fireline,
  },
  {
    slug: "hvac-ducting",
    title: "HVAC Ducting",
    short: "GI ducting fabricated and installed for efficient airflow.",
    description:
      "Design-to-install HVAC ducting in GI and aluminium, including supports, dampers, grilles and duct insulation for factories, offices and clean areas.",
    points: ["GI duct fabrication", "Duct installation & supports", "Duct insulation", "Grilles, diffusers & dampers"],
    image: hvac,
  },
  {
    slug: "manpower-solutions",
    title: "Manpower Solutions",
    short: "Skilled and semi-skilled workforce, ready for your site.",
    description:
      "Trained fitters, welders, insulators, helpers, riggers and supervisors supplied on short or long-term contracts — screened, safety-briefed and site-ready.",
    points: ["Welders & fitters", "Insulators & cladders", "Riggers & helpers", "Supervisors & safety staff", "Security, marshall and housekeeping"],
    image: manpower,
  },
  {
    slug: "scaffolding-services",
    title: "Scaffolding Services",
    short: "Safe scaffolding erection and dismantling at any height.",
    description:
      "Cup-lock and tube-and-clamp scaffolding for maintenance, shutdowns and construction, erected by trained crews to safety standards.",
    points: ["Cup-lock scaffolding", "Tube & clamp systems", "Shutdown & maintenance access", "Erection & dismantling"],
    image: scaffolding,
  },
  {
    slug: "fabrication-welding",
    title: "Fabrication & Welding",
    short: "Structural and process fabrication built to drawing.",
    description:
      "Structural steel, platforms, pipe spools, supports and custom fabrication with qualified welders in MS, SS and alloy steels.",
    points: ["Structural steel fabrication", "Pipe spools & supports", "Platforms & ladders", "MS / SS welding"],
    image: welding,
  },
];

export const stats = [
  { value: "40+", label: "Years on site" },
  { value: "250+", label: "Projects delivered" },
  { value: "150+", label: "Skilled workforce" },
  { value: "8", label: "Core services" },
];

export const clients = [
  "Archroma International (India) Private Limited",
  "Tap Turbo Engineers Private Limited",
  "Kilburn Engineering Limited",
  "Gramercy Trade Industries Private Limited",
];

export const clientsNote = "& many more plants, builders and contractors across India";

export const projects = [
  { title: "Steam line insulation, 2 km", place: "Taloja MIDC", service: "boiler-insulation" },
  { title: "Warehouse roof & wall cladding", place: "Bhiwandi", service: "sheet-metal-cladding" },
  { title: "Fire hydrant network", place: "Ambernath", service: "fireline-frp-lining" },
  { title: "Factory HVAC ducting", place: "Thane", service: "hvac-ducting" },
  { title: "Plant shutdown scaffolding", place: "Dahej", service: "scaffolding-services" },
  { title: "Pipe rack fabrication", place: "Navi Mumbai", service: "fabrication-welding" },
  { title: "Commercial tower MEP", place: "Mumbai", service: "mep-works" },
  { title: "Shutdown workforce, 80 men", place: "Raigad", service: "manpower-solutions" },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
