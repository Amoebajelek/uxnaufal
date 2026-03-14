"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "id";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.works": "Works",
    "nav.skills": "Skills",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Let's talk",

    // Hero
    "hero.eyebrow": "UI/UX Designer · Bandung, Indonesia",
    "hero.heading1": "Crafting digital",
    "hero.heading2": "experiences",
    "hero.heading3": "people love.",
    "hero.desc": "I design digital products that are useful, intuitive, and enjoyable — backed by UX laws, user research, and meticulous attention to detail.",
    "hero.cta.work": "See my work",
    "hero.cta.about": "About me",
    "hero.stat1.label": "Years of experience",
    "hero.stat1.value": "3+",
    "hero.stat2.label": "Instagram followers",
    "hero.stat2.value": "500K+",
    "hero.stat3.label": "Total community",
    "hero.stat3.value": "1.2M+",
    "hero.find": "Find me on",
    "hero.scroll": "Scroll to explore",

    // Projects
    "projects.eyebrow": "Selected work",
    "projects.heading": "Recent projects",
    "projects.all": "All projects",
    "projects.featured": "Featured",

    // Skills
    "skills.eyebrow": "Toolkit",
    "skills.heading": "Skills & tools",

    // About
    "about.eyebrow": "About",
    "about.p1": "A UI/UX Designer from Bandung, Indonesia with 3+ years of experience crafting digital products that are both useful and enjoyable. I work with teams to translate user needs into beautiful, functional interfaces.",
    "about.p2": "Beyond client work, I share design knowledge and insights with a community of 1.2M+ followers across social media — making design more accessible and understandable for everyone.",
    "about.highlights": "Highlights",
    "about.stat1": "Years",
    "about.stat2": "Projects",
    "about.stat3": "Community",
    "about.philosophy.label": "Design philosophy",
    "about.philosophy.quote": "\"Great design is invisible. It solves the right problem in the simplest way — making the user feel understood, not impressed.\"",
    "about.item1.title": "Based in Bandung, Indonesia",
    "about.item1.desc": "Available for remote work worldwide",
    "about.item2.title": "3+ Years of Experience",
    "about.item2.desc": "Working across startups to enterprise clients",
    "about.item3.title": "UX-First Approach",
    "about.item3.desc": "Every decision backed by research & UX laws",
    "about.item4.title": "1.2M+ Community",
    "about.item4.desc": "Design educator across Instagram, Threads & TikTok",

    // Contact
    "contact.eyebrow": "Let's collaborate",
    "contact.heading1": "Have a project",
    "contact.heading2": "in",
    "contact.heading3": "mind?",
    "contact.desc": "Let's create something great together.",
    "contact.desc2": "I'm currently available for new projects.",
  },
  id: {
    // Navbar
    "nav.works": "Karya",
    "nav.skills": "Keahlian",
    "nav.about": "Tentang",
    "nav.contact": "Kontak",
    "nav.cta": "Hubungi",

    // Hero
    "hero.eyebrow": "Desainer UI/UX · Bandung, Indonesia",
    "hero.heading1": "Merancang pengalaman",
    "hero.heading2": "digital",
    "hero.heading3": "yang dicintai.",
    "hero.desc": "Saya mendesain produk digital yang berguna, intuitif, dan menyenangkan — didukung UX laws, riset pengguna, dan perhatian penuh terhadap detail.",
    "hero.cta.work": "Lihat karya",
    "hero.cta.about": "Tentang saya",
    "hero.stat1.label": "Tahun pengalaman",
    "hero.stat1.value": "3+",
    "hero.stat2.label": "Followers Instagram",
    "hero.stat2.value": "500K+",
    "hero.stat3.label": "Total komunitas",
    "hero.stat3.value": "1.2M+",
    "hero.find": "Temukan saya di",
    "hero.scroll": "Scroll untuk jelajahi",

    // Projects
    "projects.eyebrow": "Karya pilihan",
    "projects.heading": "Proyek terbaru",
    "projects.all": "Semua proyek",
    "projects.featured": "Unggulan",

    // Skills
    "skills.eyebrow": "Keahlian",
    "skills.heading": "Skill & tools",

    // About
    "about.eyebrow": "Tentang",
    "about.p1": "Desainer UI/UX dari Bandung, Indonesia dengan 3+ tahun pengalaman merancang produk digital yang bermanfaat dan menyenangkan. Saya bekerja bersama tim untuk menerjemahkan kebutuhan pengguna menjadi antarmuka yang indah dan fungsional.",
    "about.p2": "Di luar pekerjaan klien, saya berbagi pengetahuan dan wawasan desain kepada komunitas 1,2 juta+ pengikut di media sosial — menjadikan desain lebih mudah diakses dan dipahami oleh semua orang.",
    "about.highlights": "Pencapaian",
    "about.stat1": "Tahun",
    "about.stat2": "Proyek",
    "about.stat3": "Komunitas",
    "about.philosophy.label": "Filosofi desain",
    "about.philosophy.quote": "\"Desain yang baik tidak terlihat. Ia memecahkan masalah yang tepat dengan cara paling sederhana — membuat pengguna merasa dipahami, bukan terkesan.\"",
    "about.item1.title": "Berbasis di Bandung, Indonesia",
    "about.item1.desc": "Tersedia untuk kerja jarak jauh",
    "about.item2.title": "3+ Tahun Pengalaman",
    "about.item2.desc": "Bekerja dari startup hingga perusahaan enterprise",
    "about.item3.title": "Pendekatan UX-First",
    "about.item3.desc": "Setiap keputusan didukung riset & UX laws",
    "about.item4.title": "Komunitas 1,2 Juta+",
    "about.item4.desc": "Edukator desain di Instagram, Threads & TikTok",

    // Contact
    "contact.eyebrow": "Ayo berkolaborasi",
    "contact.heading1": "Punya proyek",
    "contact.heading2": "di",
    "contact.heading3": "pikiran?",
    "contact.desc": "Mari buat sesuatu yang luar biasa bersama.",
    "contact.desc2": "Saya saat ini tersedia untuk proyek baru.",
  },
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
