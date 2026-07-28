export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  /** short punchy value line shown prominently on the card */
  outcome: string;
  blurb: string;
  /** longer intro shown at the top of the case study */
  overview: string;
  role: string[];
  behance: string;
  cover: string;
  images: string[];
};

const img = (dir: string, n: number) =>
  `/work/${dir}/${String(n).padStart(2, "0")}.webp`;
const range = (dir: string, count: number) =>
  Array.from({ length: count }, (_, i) => img(dir, i + 1));

export const PROJECTS: Project[] = [
  {
    slug: "doctor",
    title: "Doctor Appointment App",
    category: "UX Case Study",
    year: "2025",
    outcome: "A booking flow designed to get patients from search to confirmed in fewer steps.",
    blurb:
      "End-to-end UX case study for a healthcare booking app — research, flows, and a calm, trustworthy interface.",
    overview:
      "A full UX case study: understanding how patients actually book care, then designing a booking flow that removes friction at every step — from finding the right doctor to confirming an appointment.",
    role: ["UX Research", "User Flows", "UI Design", "Prototyping"],
    behance: "https://www.behance.net/gallery/236248469/Doctor-Appointment-App-UX-Case-Study",
    cover: img("doctor", 1),
    images: range("doctor", 14),
  },
  {
    slug: "cib",
    title: "CIB Mobile Banking",
    category: "UI/UX Redesign",
    year: "2025",
    outcome: "Rebuilt the hierarchy around the tasks people do most — balances, transfers, bills.",
    blurb:
      "A redesign of a mobile banking app focused on clarity, trust, and faster everyday transactions.",
    overview:
      "Reimagining a mobile banking experience around the things people do most — checking balances, transferring money, paying bills — with a cleaner hierarchy and a more confident visual system.",
    role: ["UX Audit", "UI Redesign", "Design System", "Prototyping"],
    behance: "https://www.behance.net/gallery/235671415/CIB-Mobile-Banking-App-UXUI-Redesign",
    cover: img("cib", 1),
    images: range("cib", 19),
  },
  {
    slug: "netlink",
    title: "Netlink",
    category: "Branding · Logo",
    year: "2024",
    outcome: "A mark and identity that reads modern and dependable at any size.",
    blurb:
      "Logo & identity concept — capturing brand DNA with clean composition and a distinct visual voice.",
    overview:
      "A branding concept exploring how a tech/connectivity brand can feel both modern and dependable — from the core mark through to color, type, and application.",
    role: ["Logo Design", "Brand Identity", "Visual System"],
    behance: "https://www.behance.net/gallery/204375077/Netlink-Logo-concept",
    cover: img("netlink", 1),
    images: range("netlink", 10),
  },
];
