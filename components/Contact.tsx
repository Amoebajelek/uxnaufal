"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/naufalabdussyakur/", primary: true },
  { label: "Instagram", href: "https://www.instagram.com/uxnaufal" },
  { label: "Threads", href: "https://www.threads.com/@uxnaufal" },
  { label: "TikTok", href: "https://www.tiktok.com/@uxnaufal" },
];

const easing = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      className="py-28 px-6 md:px-10 text-center"
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-8 font-medium"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easing }}
        >
          <span className="h-px w-5" style={{ backgroundColor: "var(--text-muted)" }} />
          {t("contact.eyebrow")}
          <span className="h-px w-5" style={{ backgroundColor: "var(--text-muted)" }} />
        </motion.div>

        <motion.h2
          className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.03] mb-5"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: easing }}
        >
          {t("contact.heading1")}
          <br />
          {t("contact.heading2")}{" "}
          <span style={{ color: "var(--accent)" }}>{t("contact.heading3")}</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg mb-12 font-light"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: easing }}
        >
          {t("contact.desc")}
          <br />
          {t("contact.desc2")}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: easing }}
        >
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border transition-colors duration-200 active:scale-95"
              style={
                l.primary
                  ? {
                      backgroundColor: "var(--accent)",
                      color: "#0a0a0a",
                      borderColor: "transparent",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "var(--text-secondary)",
                      borderColor: "var(--border-strong)",
                    }
              }
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.07, ease: easing }}
              whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.2 } }}
            >
              {l.label}
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
