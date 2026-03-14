import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialStrip } from "@/components/SocialStrip";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { readAllProjects } from "@/lib/data-store.server";

export const dynamic = "force-dynamic";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Naufal Abdussyakur",
  url: "https://uxnaufal.vercel.app",
  jobTitle: "UI/UX Designer",
  description:
    "UI/UX Designer with 3+ years crafting digital products that are useful and enjoyable. Based in Bandung, Indonesia.",
  sameAs: [
    "https://www.instagram.com/uxnaufal",
    "https://www.tiktok.com/@uxnaufal",
    "https://www.threads.com/@uxnaufal",
    "https://www.linkedin.com/in/naufalabdussyakur/",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressCountry: "ID",
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
