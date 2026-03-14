export interface ProjectSection {
  type: "text" | "metrics" | "process" | "features" | "quote";
  title?: string;
  content?: string;
  items?: { label: string; value: string; desc?: string }[];
  steps?: { icon: string; title: string; desc: string; tools?: string[] }[];
  features?: { icon: string; title: string; desc: string }[];
  quote?: string;
  author?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  year: string;
  duration: string;
  role: string;
  client: string;
  description: string;
  longDesc: string;
  tags: string[];
  tools: string[];
  color: string;
  accent: string;
  externalHref?: string;
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: "aitiserve",
    slug: "aitiserve",
    title: "Official Website of Aitiserve",
    type: "Website Redesign",
    year: "2024",
    duration: "6 weeks",
    role: "Lead UI/UX Designer",
    client: "Aitiserve",
    description:
      "A complete website redesign guided by UX laws, with full design and handoff documentation. End-to-end product thinking from research to delivery.",
    longDesc:
      "Aitiserve needed a complete digital transformation of their corporate website. The old site suffered from poor information architecture, inconsistent visual language, and a high bounce rate. I led the end-to-end redesign process — from stakeholder interviews and heuristic evaluation to final UI delivery and developer handoff.",
    tags: ["UX Research", "UI Design", "Handoff"],
    tools: ["Figma", "FigJam", "Maze", "Hotjar", "Notion"],
    color: "#1a1a1a",
    accent: "#c8ff57",
    externalHref:
      "https://uxnaufal.vercel.app/portofolios/aitiserve",
    sections: [
      {
        type: "metrics",
        title: "Impact & Results",
        items: [
          { label: "Bounce Rate", value: "−38%", desc: "Reduced after redesign" },
          { label: "Session Duration", value: "+2.4×", desc: "Avg. time on site" },
          { label: "Lead Conversion", value: "+22%", desc: "Contact form submissions" },
          { label: "Design Screens", value: "40+", desc: "Delivered to devs" },
        ],
      },
      {
        type: "text",
        title: "The Problem",
        content:
          "Aitiserve's website lacked a clear value proposition and consistent visual identity. Visitors couldn't quickly understand what services were offered, and the navigation was confusing — causing high drop-off at key funnel steps. Stakeholders also reported that the site felt 'outdated' compared to competitors.",
      },
      {
        type: "process",
        title: "Design Process",
        steps: [
          {
            icon: "◈",
            title: "Discovery & Research",
            desc: "Conducted stakeholder interviews, heuristic evaluation using Nielsen's 10 usability heuristics, and competitive analysis of 5 competitor websites.",
            tools: ["FigJam", "Notion"],
          },
          {
            icon: "◉",
            title: "Information Architecture",
            desc: "Reorganized the site structure using card sorting and tree testing. Reduced navigation depth from 4 levels to 2.",
            tools: ["Maze", "FigJam"],
          },
          {
            icon: "✦",
            title: "Wireframing & Prototyping",
            desc: "Created low-fi wireframes for all 8 key pages, then iterated to high-fidelity with a new design system grounded in UX laws.",
            tools: ["Figma"],
          },
          {
            icon: "⊕",
            title: "Usability Testing",
            desc: "Ran 2 rounds of moderated usability testing with 6 participants. Identified and resolved 12 critical usability issues.",
            tools: ["Maze", "Hotjar"],
          },
          {
            icon: "⊞",
            title: "Handoff & Documentation",
            desc: "Delivered 40+ annotated screens, a component library, design tokens, and developer specs in Notion.",
            tools: ["Figma", "Notion"],
          },
        ],
      },
      {
        type: "features",
        title: "Key Design Decisions",
        features: [
          {
            icon: "◈",
            title: "Law of Proximity",
            desc: "Grouped related services visually to reduce cognitive load, making the offering immediately scannable.",
          },
          {
            icon: "✦",
            title: "Progressive Disclosure",
            desc: "Hero section shows only essential info — details expand as users scroll, preventing overwhelm.",
          },
          {
            icon: "◉",
            title: "Fitts's Law",
            desc: "CTAs enlarged and repositioned to reduce interaction cost, especially on mobile viewports.",
          },
          {
            icon: "⊕",
            title: "Visual Hierarchy",
            desc: "Implemented a clear typographic scale (H1–H4 + body) to guide attention from headline to CTA.",
          },
        ],
      },
      {
        type: "quote",
        quote:
          "Naufal delivered not just beautiful screens, but a thoughtful design system that made our dev team's life so much easier.",
        author: "Stakeholder, Aitiserve",
      },
    ],
  },
  {
    id: "papyrusphoto",
    slug: "papyrusphoto",
    title: "Mobile App by Papyrusphoto",
    type: "Tablet Application",
    year: "2024",
    duration: "4 weeks",
    role: "UI/UX Designer",
    client: "Papyrusphoto",
    description:
      "Complete tablet application redesign with a UX-first approach and comprehensive handoff documentation.",
    longDesc:
      "Papyrusphoto needed their photo management tablet app redesigned to improve workflow efficiency for professional photographers. The existing app had a cluttered interface that slowed down post-shoot editing workflows. I redesigned the app with a focus on task efficiency, gesture interactions, and a clean visual system.",
    tags: ["Mobile UX", "Tablet", "Figma"],
    tools: ["Figma", "ProtoPie", "FigJam", "Notion"],
    color: "#111827",
    accent: "#60a5fa",
    externalHref:
      "https://naufalabdussyakur.notion.site/PAPYRUS-PHOTO-Tablet-Application-1865d9ae1b9c808887a3e91b34d9031a",
    sections: [
      {
        type: "metrics",
        title: "Impact & Results",
        items: [
          { label: "Task Completion", value: "+47%", desc: "Faster photo curation" },
          { label: "Error Rate", value: "−60%", desc: "Accidental actions" },
          { label: "SUS Score", value: "84/100", desc: "Usability score" },
          { label: "Prototype Screens", value: "25+", desc: "Interactive flows" },
        ],
      },
      {
        type: "text",
        title: "The Problem",
        content:
          "Professional photographers using Papyrusphoto struggled with a cluttered interface that buried key actions behind multiple taps. The grid view was too small for precise selection, gestures were inconsistent, and the dark room editing mode caused eye strain. Users reported spending 30% more time than needed on routine culling tasks.",
      },
      {
        type: "process",
        title: "Design Process",
        steps: [
          {
            icon: "◈",
            title: "User Interviews",
            desc: "Interviewed 5 professional photographers to understand their workflow. Mapped the entire post-shoot process from import to export.",
            tools: ["FigJam"],
          },
          {
            icon: "◉",
            title: "Task Analysis",
            desc: "Broke down the primary workflow into 12 key tasks. Identified 8 friction points causing the most time loss.",
            tools: ["FigJam", "Notion"],
          },
          {
            icon: "✦",
            title: "Gesture Design",
            desc: "Designed an intuitive gesture system for tablet — swipe to rate, pinch to zoom, long-press for batch selection.",
            tools: ["Figma", "ProtoPie"],
          },
          {
            icon: "⊕",
            title: "High-Fi Prototype",
            desc: "Built a 25-screen interactive prototype in ProtoPie with realistic animations and gesture interactions.",
            tools: ["ProtoPie", "Figma"],
          },
        ],
      },
      {
        type: "features",
        title: "Key Design Decisions",
        features: [
          {
            icon: "◈",
            title: "Gestalt Proximity",
            desc: "Editing tools grouped by function (exposure, color, detail) to reduce search time during editing.",
          },
          {
            icon: "✦",
            title: "Hick's Law",
            desc: "Reduced toolbar from 24 options to 8 primary actions, with secondary tools accessible via a minimal overflow menu.",
          },
          {
            icon: "◉",
            title: "Dark Mode Optimization",
            desc: "Calibrated dark background (#0d0d0d) and dimmed UI chrome to protect color-accurate photo evaluation.",
          },
          {
            icon: "⊕",
            title: "Motor Space Consideration",
            desc: "All tap targets minimum 44×44pt per Apple HIG, with extra padding for the most-used star rating buttons.",
          },
        ],
      },
    ],
  },
  {
    id: "telkom",
    slug: "telkom",
    title: "Product Catalog — Telkom Indonesia",
    type: "Enterprise CMS",
    year: "2023",
    duration: "8 weeks",
    role: "UI/UX Designer",
    client: "Telkom Indonesia",
    description:
      "Enterprise-scale CMS product catalog redesign for Telkom Indonesia's digital ecosystem.",
    longDesc:
      "Telkom Indonesia's internal CMS for managing their product catalog was a legacy system that bottlenecked their digital operations. Internal teams spent hours navigating a confusing admin interface to update product listings. I redesigned the CMS with a focus on admin efficiency, data integrity, and scalable component architecture.",
    tags: ["Enterprise", "CMS", "Design System"],
    tools: ["Figma", "FigJam", "Tokens Studio", "Zeplin", "Confluence"],
    color: "#0f172a",
    accent: "#f97316",
    externalHref:
      "https://naufalabdussyakur.notion.site/CMS-Product-Catalog-Telkom-Product-Catalog-Website-1865d9ae1b9c8003a98fc129586a3b86",
    sections: [
      {
        type: "metrics",
        title: "Impact & Results",
        items: [
          { label: "Admin Task Time", value: "−55%", desc: "Average time per update" },
          { label: "Training Time", value: "−70%", desc: "New admin onboarding" },
          { label: "Components Built", value: "60+", desc: "Design system components" },
          { label: "Data Errors", value: "−40%", desc: "Input validation errors" },
        ],
      },
      {
        type: "text",
        title: "The Problem",
        content:
          "Telkom's product catalog CMS was a legacy system built in 2017 with no design system. Admins had to navigate 7+ steps to update a single product listing. The interface lacked bulk edit capabilities, had no inline validation, and the component library was non-existent — every page was built from scratch. This caused inconsistency and slow operations across 200+ admin users.",
      },
      {
        type: "process",
        title: "Design Process",
        steps: [
          {
            icon: "◈",
            title: "Admin Shadowing",
            desc: "Shadowed 4 power users performing their daily tasks. Identified 15 repetitive micro-tasks ripe for automation or shortcut.",
            tools: ["Notion", "FigJam"],
          },
          {
            icon: "◉",
            title: "Audit & Inventory",
            desc: "Audited all 32 legacy screens. Documented every UI pattern in use and identified inconsistencies.",
            tools: ["Figma"],
          },
          {
            icon: "✦",
            title: "Design System First",
            desc: "Built a foundational design system with tokens, atoms, and molecules before designing any screens.",
            tools: ["Figma", "Tokens Studio"],
          },
          {
            icon: "⊕",
            title: "Iterative Design",
            desc: "3 rounds of design reviews with product managers and lead engineers. Maintained a feedback log in Confluence.",
            tools: ["Figma", "Confluence"],
          },
          {
            icon: "⊞",
            title: "Zeplin Handoff",
            desc: "Delivered all specs via Zeplin with annotated components, spacing guides, and interaction notes.",
            tools: ["Zeplin", "Confluence"],
          },
        ],
      },
      {
        type: "features",
        title: "Key Design Decisions",
        features: [
          {
            icon: "◈",
            title: "Progressive Complexity",
            desc: "Simple view for routine edits, advanced mode for power users — applied Jakob's Law to match mental models.",
          },
          {
            icon: "✦",
            title: "Inline Validation",
            desc: "Real-time field validation with clear error states reduced form errors by 40% and support tickets by 25%.",
          },
          {
            icon: "◉",
            title: "Bulk Operations",
            desc: "Designed a bulk action system for updating 100+ products simultaneously — a feature previously unavailable.",
          },
          {
            icon: "⊕",
            title: "Design Tokens",
            desc: "Token-based design system ensured 100% consistency between design and production across all 60+ components.",
          },
        ],
      },
    ],
  },
  {
    id: "baleseni",
    slug: "baleseni",
    title: "Bale Seni Barli",
    type: "Website Redesign",
    year: "2023",
    duration: "3 weeks",
    role: "UI/UX Designer",
    client: "Kota Baru Parahyangan",
    description:
      "Cultural arts center website redesign by Kota Baru Parahyangan, focused on accessibility and visual identity.",
    longDesc:
      "Bale Seni Barli is a cultural arts center under Kota Baru Parahyangan. Their website needed a redesign that honored the cultural heritage and artistic identity of the institution while improving accessibility and event discovery. The challenge was balancing aesthetic richness with clear usability.",
    tags: ["Cultural", "Accessibility", "Visual Design"],
    tools: ["Figma", "FigJam", "Hotjar"],
    color: "#1c1917",
    accent: "#fb923c",
    externalHref:
      "https://naufalabdussyakur.notion.site/Bale-Seni-Barli-Redesign-official-website-1865d9ae1b9c800c8dccf8b0c5e86be2",
    sections: [
      {
        type: "metrics",
        title: "Impact & Results",
        items: [
          { label: "Accessibility Score", value: "AA", desc: "WCAG 2.1 compliance" },
          { label: "Event Discovery", value: "+3×", desc: "Clicks on upcoming events" },
          { label: "Mobile Usage", value: "+65%", desc: "Visitors on mobile" },
          { label: "Load Time", value: "−40%", desc: "Page load improvement" },
        ],
      },
      {
        type: "text",
        title: "The Problem",
        content:
          "The original website had a text-heavy layout with poor contrast ratios, no mobile optimization, and buried event information. For a cultural institution, the website felt cold and disconnected from the warmth and richness of the arts. Event visitors couldn't easily find schedules, and the gallery section was inaccessible on mobile devices.",
      },
      {
        type: "process",
        title: "Design Process",
        steps: [
          {
            icon: "◈",
            title: "Brand Discovery",
            desc: "Workshops with the Bale Seni Barli team to extract brand values: warmth, culture, accessibility, and community.",
            tools: ["FigJam"],
          },
          {
            icon: "◉",
            title: "Accessibility Audit",
            desc: "Full WCAG 2.1 audit of the existing site. Identified 23 accessibility violations including contrast, alt text, and keyboard navigation.",
            tools: ["Figma"],
          },
          {
            icon: "✦",
            title: "Visual Identity Exploration",
            desc: "Explored 3 visual directions before settling on a warm earthy palette that reflects traditional Sundanese art.",
            tools: ["Figma"],
          },
          {
            icon: "⊕",
            title: "Responsive Design",
            desc: "Designed all breakpoints simultaneously (mobile, tablet, desktop) to ensure true responsiveness.",
            tools: ["Figma"],
          },
        ],
      },
      {
        type: "features",
        title: "Key Design Decisions",
        features: [
          {
            icon: "◈",
            title: "Warm Color System",
            desc: "Earth tones (warm oranges, deep browns, cream) inspired by batik patterns — emotionally connecting users to the cultural context.",
          },
          {
            icon: "✦",
            title: "Typography as Art",
            desc: "Used a display typeface with cultural character for headings, paired with a highly readable body font for accessibility.",
          },
          {
            icon: "◉",
            title: "Event-First Layout",
            desc: "Upcoming events surfaced to the homepage hero, reducing the steps to event discovery from 4 to 1.",
          },
          {
            icon: "⊕",
            title: "WCAG AA Compliance",
            desc: "All color combinations checked for 4.5:1 contrast ratio minimum. Added focus indicators and ARIA labels throughout.",
          },
        ],
      },
    ],
  },
  {
    id: "amalacademy",
    slug: "amalacademy",
    title: "Amal Academy — E-Course Platform",
    type: "New Design",
    year: "2023",
    duration: "5 weeks",
    role: "Lead UI/UX Designer",
    client: "Amal Solution",
    description:
      "Complete e-learning platform design for Amal Solution, from information architecture to final UI.",
    longDesc:
      "Amal Solution needed a brand-new e-learning platform for professional development courses. Starting from zero, I designed the complete product experience: learner onboarding, course discovery, video player with notes, progress tracking, and certification. The platform needed to serve both individual learners and corporate cohorts.",
    tags: ["E-Learning", "New Design", "UX Strategy"],
    tools: ["Figma", "FigJam", "Maze", "ProtoPie", "Notion"],
    color: "#0c0a09",
    accent: "#a78bfa",
    externalHref:
      "https://naufalabdussyakur.notion.site/Amal-Academy-E-Course-Website-1865d9ae1b9c80bf9fdbdefc464811a1",
    sections: [
      {
        type: "metrics",
        title: "Impact & Results",
        items: [
          { label: "Screens Designed", value: "55+", desc: "Full product coverage" },
          { label: "User Flows", value: "12", desc: "End-to-end mapped flows" },
          { label: "Test Satisfaction", value: "92%", desc: "Usability test score" },
          { label: "Onboarding Steps", value: "3", desc: "Down from planned 7" },
        ],
      },
      {
        type: "text",
        title: "The Problem",
        content:
          "Amal Solution was entering the e-learning market with no existing product. They needed a platform that could compete with established players like Udemy and Coursera, but with a focus on professional Islamic development. The challenge was designing an entirely new product that felt familiar enough to not require a learning curve, while being distinctive in its positioning.",
      },
      {
        type: "process",
        title: "Design Process",
        steps: [
          {
            icon: "◈",
            title: "Market Research",
            desc: "Analyzed 6 competing e-learning platforms. Identified gaps and opportunities in the professional Islamic education niche.",
            tools: ["FigJam", "Notion"],
          },
          {
            icon: "◉",
            title: "User Personas & Jobs",
            desc: "Created 3 primary personas: individual learner, corporate HR manager, and course instructor. Mapped jobs-to-be-done for each.",
            tools: ["FigJam"],
          },
          {
            icon: "✦",
            title: "Information Architecture",
            desc: "Built a complete IA covering all 12 user flows across learner, instructor, and admin roles.",
            tools: ["FigJam"],
          },
          {
            icon: "⊕",
            title: "Design System Creation",
            desc: "Built a purple-accented design system from scratch with 80+ components covering all product UI patterns.",
            tools: ["Figma", "Notion"],
          },
          {
            icon: "⊞",
            title: "Prototype & Testing",
            desc: "Interactive prototype tested with 8 participants in 2 rounds. Iterated on the course player and progress dashboard.",
            tools: ["ProtoPie", "Maze"],
          },
        ],
      },
      {
        type: "features",
        title: "Key Design Decisions",
        features: [
          {
            icon: "◈",
            title: "Progress Visibility",
            desc: "Persistent progress bar and streak system applied Zeigarnik Effect to motivate course completion.",
          },
          {
            icon: "✦",
            title: "In-video Notes",
            desc: "Timestamped notes feature lets learners annotate while watching — reducing the need to re-watch for reference.",
          },
          {
            icon: "◉",
            title: "Cohort Mode",
            desc: "Designed a group learning dashboard for corporate clients — discussion boards, shared progress, and admin oversight.",
          },
          {
            icon: "⊕",
            title: "Minimal Onboarding",
            desc: "Reduced onboarding from 7 planned steps to 3 by using smart defaults and progressive profile completion.",
          },
        ],
      },
      {
        type: "quote",
        quote:
          "The platform feels polished and professional. Our beta users said it was the most intuitive e-learning app they'd used.",
        author: "Product Manager, Amal Solution",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
