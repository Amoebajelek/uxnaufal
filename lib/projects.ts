/* ─────────────────────────────────────────────────────────
   Portfolio project data — sourced from old-uxnaufal repo
   ───────────────────────────────────────────────────────── */

export type SectionType =
  | "nutshell"
  | "context"
  | "problem-discovery"
  | "problem"
  | "solution"
  | "finaldesign"
  | "reflection"
  | "notion-only";

export interface DesignItem {
  label: string;
  image: string;
}

export interface ProjectSection {
  type: SectionType;
  label?: string;           // e.g. "Problem #1"
  heading: string;
  content?: string;
  image?: string;           // single image
  list?: string[];          // ordered/unordered list items
  boldList?: { term: string; desc: string }[];  // definition list
  items?: DesignItem[];     // for finaldesign section
  learnings?: string[];     // for reflection
  collaborators?: string[]; // for reflection
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  year: string;
  duration: string;
  role?: string;
  client?: string;
  liveUrl?: string;
  description: string;
  tags: string[];
  color: string;
  accent: string;
  thumbnail?: string;       // real photo thumbnail
  externalHref?: string;    // Notion or external link
  skills?: string[];        // e.g. ["Design Thinking", "Wireframe", "Product Design"]
  sections: ProjectSection[];
}

export const projects: Project[] = [
  /* ─── 1. AITISERVE ─── */
  {
    id: "aitiserve",
    slug: "aitiserve",
    title: "Official Website of AITISERVE.CO.ID",
    type: "Redesign",
    year: "2024",
    duration: "June 2024 · 3 Weeks",
    role: "Lead UI/UX Designer",
    client: "PT. Aitiserve Djaya Naraya",
    liveUrl: "https://aitiserve.co.id",
    description:
      "A complete website redesign for PT. Aitiserve Djaya Naraya, guided by UX laws and supported with full design and handoff documentation.",
    tags: ["UX Research", "UI Design", "Handoff"],
    skills: ["Design Thinking", "Wireframe", "Product Design"],
    color: "#1a1a1a",
    accent: "#c8ff57",
    thumbnail: "/Thumbnail_Aitiserve.jpg",
    externalHref: "https://aitiserve.co.id",
    sections: [
      {
        type: "nutshell",
        label: "In a Nutshell",
        heading: "Revamping the official website with full design and development documentation.",
        content:
          "Enhancing the AITISERVE website to meet stakeholder requirements and support the company's long-term objectives.",
      },
      {
        type: "context",
        label: "Context",
        heading: "Understanding AITISERVE",
        content:
          "AITISERVE specializes in software development and digital platform services, including programming, web portal management, as well as IT consulting and technical support.",
        image: "/Aitiserve_Context.jpg",
        boldList: [
          { term: "Landing Page", desc: "Introduces users to AITISERVE and provides an overview of who we are." },
          { term: "Services", desc: "Showcases the products and services offered by AITISERVE." },
          { term: "Portfolios", desc: "Highlights legacy projects that demonstrate AITISERVE's capabilities and experience." },
          { term: "Blogs", desc: "Allows users to explore articles, insights, and knowledge shared by our team." },
          { term: "About Us", desc: "Offers a deeper understanding of AITISERVE's vision, mission, and team." },
          { term: "Career", desc: "Displays current job openings and the benefits of joining AITISERVE." },
          { term: "Contact Us", desc: "Provides various ways for users to get in touch with AITISERVE." },
        ],
      },
      {
        type: "problem-discovery",
        label: "Problem Discovery",
        heading: "The current design feels visually underwhelming and could be improved for better engagement.",
        content:
          "The design feels unpolished, with cluttered content, inconsistent layout, and missing documentation. Despite being new, establishing professionalism early on is crucial.",
      },
      {
        type: "problem",
        label: "Problem #1",
        heading: "Weak visual presentation",
        content:
          "Inconsistent alignment across components, content, typography, and layout affects overall visual harmony.",
        image: "/Preview-Problem-Discovery.jpg",
      },
      {
        type: "solution",
        label: "Solution #1",
        heading: "Using UX laws to guide decision-making in new design development.",
        content:
          "In the redesign process, we applied foundational UX laws—such as Hick's Law, Fitts's Law, and the Law of Proximity—to ensure every design decision was backed by human-centered principles. These laws helped streamline user interactions, improve visual hierarchy, and create more intuitive experiences. By grounding our design choices in proven UX principles, we enhanced usability, clarity, and overall user satisfaction.",
      },
      {
        type: "problem",
        label: "Problem #2",
        heading: "Design documentation is missing or incomplete, making implementation harder.",
        content:
          "The absence or incompleteness of design documentation creates significant challenges during the development phase. Without clear references for components, layouts, and interactions, developers may misinterpret the intended design, leading to inconsistencies, delays, and increased rework. Comprehensive documentation is essential to ensure smooth collaboration, accurate implementation, and long-term maintainability.",
      },
      {
        type: "solution",
        label: "Solution #2",
        heading: "Applying the Design Thinking framework through its five key phases.",
        content:
          "The Design Thinking framework was applied systematically through its five key phases: Empathize, Define, Ideate, Prototype, and Test. This approach ensured a deep understanding of user needs, clear problem definition, creative solution generation, iterative prototyping, and continuous validation. By following this user-centered process, we were able to design solutions that are not only functional but also meaningful and relevant to real user challenges.",
      },
      {
        type: "finaldesign",
        label: "Final Design",
        heading: "The new look of AITISERVE",
        items: [
          { label: "Design Thinking", image: "/Design-Thinking-Aitiserve.jpg" },
          { label: "Low-Fidelity / Wireframe", image: "/Wireframe-Aitiserve.jpg" },
          { label: "High-Fidelity / Visual Design", image: "/Visual-Design-Aitiserve.jpg" },
        ],
      },
      {
        type: "reflection",
        label: "Reflection",
        heading: "What I've Learnt & Special Thanks",
        content: "During this project, I've got the opportunity to:",
        learnings: [
          "Learn more about Design Thinking and Product Design.",
          "Conducted Live Usability Tests.",
          "Conducted A/B Experiment and having the new designs win.",
        ],
        collaborators: [
          "Director of Aitiserve — Achmad Faizal",
        ],
      },
    ],
  },

  /* ─── 2. PAPYRUSPHOTO ─── */
  {
    id: "papyrusphoto",
    slug: "papyrusphoto",
    title: "Mobile App by Papyrusphoto",
    type: "Tablet Application",
    year: "2024",
    duration: "2024 · 4 Weeks",
    role: "UI/UX Designer",
    client: "Papyrusphoto",
    description:
      "Complete tablet application redesign with a UX-first approach and comprehensive handoff documentation.",
    tags: ["Mobile UX", "Tablet", "Figma"],
    skills: ["Mobile Design", "Figma", "Handoff"],
    color: "#111827",
    accent: "#60a5fa",
    thumbnail: "/Thumbnail_Papyrusphoto.jpg",
    externalHref:
      "https://naufalabdussyakur.notion.site/PAPYRUS-PHOTO-Tablet-Application-1865d9ae1b9c808887a3e91b34d9031a",
    sections: [
      {
        type: "notion-only",
        heading: "Full Case Study on Notion",
        content:
          "The complete case study for Papyrusphoto Tablet Application — including research findings, design process, wireframes, and final UI — is documented on Notion. Click the button below to read the full write-up.",
      },
    ],
  },

  /* ─── 3. TELKOM ─── */
  {
    id: "telkom",
    slug: "telkom",
    title: "Product Catalog — Telkom Indonesia",
    type: "Enterprise CMS",
    year: "2023",
    duration: "2023 · 8 Weeks",
    role: "UI/UX Designer",
    client: "Telkom Indonesia",
    description:
      "Enterprise-scale CMS product catalog redesign for Telkom Indonesia's digital ecosystem.",
    tags: ["Enterprise", "CMS", "Design System"],
    skills: ["Design System", "CMS Design", "Handoff"],
    color: "#0f172a",
    accent: "#f97316",
    thumbnail: "/Thumbnail_CMS_Product_Catalog.jpg",
    externalHref:
      "https://naufalabdussyakur.notion.site/CMS-Product-Catalog-Telkom-Product-Catalog-Website-1865d9ae1b9c8003a98fc129586a3b86",
    sections: [
      {
        type: "notion-only",
        heading: "Full Case Study on Notion",
        content:
          "The complete case study for the Telkom Indonesia CMS Product Catalog — including audit findings, design system documentation, component library, and developer handoff — is documented on Notion. Click the button below to read the full write-up.",
      },
    ],
  },

  /* ─── 4. BALE SENI BARLI ─── */
  {
    id: "baleseni",
    slug: "baleseni",
    title: "Bale Seni Barli",
    type: "Website Redesign",
    year: "2023",
    duration: "2023 · 3 Weeks",
    role: "UI/UX Designer",
    client: "Kota Baru Parahyangan",
    description:
      "Cultural arts center website redesign by Kota Baru Parahyangan, focused on accessibility and visual identity.",
    tags: ["Cultural", "Accessibility", "Visual Design"],
    skills: ["Visual Design", "Accessibility", "Responsive"],
    color: "#1c1917",
    accent: "#fb923c",
    thumbnail: "/Thumbnail_Bale_Seni_Barli.jpg",
    externalHref:
      "https://naufalabdussyakur.notion.site/Bale-Seni-Barli-Redesign-official-website-1865d9ae1b9c800c8dccf8b0c5e86be2",
    sections: [
      {
        type: "notion-only",
        heading: "Full Case Study on Notion",
        content:
          "The complete case study for Bale Seni Barli website redesign — including brand discovery, accessibility audit, visual identity exploration, and final responsive designs — is documented on Notion. Click the button below to read the full write-up.",
      },
    ],
  },

  /* ─── 5. AMAL ACADEMY ─── */
  {
    id: "amalacademy",
    slug: "amalacademy",
    title: "Amal Academy — E-Course Platform",
    type: "New Design",
    year: "2023",
    duration: "2023 · 5 Weeks",
    role: "Lead UI/UX Designer",
    client: "Amal Solution",
    description:
      "Complete e-learning platform design for Amal Solution, from information architecture to final UI.",
    tags: ["E-Learning", "New Design", "UX Strategy"],
    skills: ["UX Strategy", "Product Design", "Design System"],
    color: "#0c0a09",
    accent: "#a78bfa",
    thumbnail: "/Thumbnail_Amal_Academy.jpg",
    externalHref:
      "https://naufalabdussyakur.notion.site/Amal-Academy-E-Course-Website-1865d9ae1b9c80bf9fdbdefc464811a1",
    sections: [
      {
        type: "notion-only",
        heading: "Full Case Study on Notion",
        content:
          "The complete case study for Amal Academy E-Course Platform — including market research, user personas, information architecture, design system, and interactive prototype — is documented on Notion. Click the button below to read the full write-up.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
