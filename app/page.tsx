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

export default async function Home() {
  const projects = await readAllProjects();

  return (
    <main>
      <Navbar />
      <Hero />
      <SocialStrip />
      <Projects projects={projects} />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
