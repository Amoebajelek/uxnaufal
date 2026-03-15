import { Navbar }   from "@/components/Navbar";
import { Hero }     from "@/components/Hero";
import { SocialStrip } from "@/components/SocialStrip";
import { Projects } from "@/components/Projects";
import { Skills }   from "@/components/Skills";
import { About }    from "@/components/About";
import { Contact }  from "@/components/Contact";
import { Footer }   from "@/components/Footer";
import { readAllProjects } from "@/lib/data-store.server";

export const dynamic = "force-dynamic";

const BASE_URL = "https://uxnaufal.vercel.app";

// ── Rich JSON-LD: Person ──────────────────────────────────────────────────────
const personJsonLd = {
  "@context": "https://schema.org",
  "@type":    "Person",
  "@id":      `${BASE_URL}/#person`,
  name:       "Naufal Abdussyakur",
  url:        BASE_URL,
  image:      `${BASE_URL}/Thumbnail_Aitiserve.jpg`,
  jobTitle:   "UI/UX Designer",
  description:
    "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",
  knowsAbout: [
    "UI Design", "UX Design", "Product Design", "User Research",
    "Figma", "Design Systems", "Wireframing", "Prototyping",
    "Interaction Design", "Usability Testing",
  ],
  hasOccupation: {
    "@type":               "Occupation",
    name:                  "UI/UX Designer",
    occupationLocation:    { "@type": "City", name: "Bandung, Indonesia" },
    skills:                "Figma, UX Research, Product Design, Design Systems, Interaction Design",
  },
  address: {
    "@type":           "PostalAddress",
    addressLocality:   "Bandung",
    addressRegion:     "West Java",
    addressCountry:    "ID",
  },
  sameAs: [
    "https://www.instagram.com/uxnaufal",
    "https://www.tiktok.com/@uxnaufal",
    "https://www.threads.com/@uxnaufal",
    "https://www.linkedin.com/in/naufalabdussyakur/",
  ],
};

// ── Rich JSON-LD: Website ─────────────────────────────────────────────────────
const websiteJsonLd = {
  "@context":  "https://schema.org",
  "@type":     "WebSite",
  "@id":       `${BASE_URL}/#website`,
  url:         BASE_URL,
  name:        "uxnaufal",
  description: "UI/UX Design portfolio by Naufal Abdussyakur",
  author:      { "@id": `${BASE_URL}/#person` },
  inLanguage:  "en",
  potentialAction: {
    "@type":       "SearchAction",
    target:        `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function Home() {
  const projects = await readAllProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main className="overflow-x-hidden w-full">
        <Navbar />
        <Hero />
        <SocialStrip />
        <Projects projects={projects} />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
