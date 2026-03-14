"use client";

import { MapPin, Briefcase, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";

const easing = [0.16, 1, 0.3, 1] as const;

export function About() {
  const { t } = useLang();

  const items = [
    { icon: MapPin, title: t("about.item1.title"), desc: t("about.item1.desc") },
    { icon: Briefcase, title: t("about.item2.title"), desc: t("about.item2.desc") },
    { icon: BookOpen, title: t("about.item3.title"), desc: t("about.item3.desc") },
    { icon: Users, title: t("about.item4.title"), desc: t("about.item4.desc") },
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easing }}
        >
          <span
            className="text-xs uppercase tracking-widest font-medium block mb-4"
            style={{ color: "var(--accent)" }}
          >
            {t("about.eyebrow")}
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-8 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Naufal
            <br />
            Abdussyakur
          </h2>
          <p
            className="text-base leading-relaxed mb-5 font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("about.p1")}
          </p>
          <p
            className="text-base leading-relaxed mb-10 font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("about.p2")}
          </p>

          {/* Divider line with label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              {t("about.highlights")}
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          </div>

          {/* Stat trio */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "3+", label: t("about.stat1") },
              { val: "5+", label: t("about.stat2") },
              { val: "1.2M+", label: t("about.stat3") },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center py-5 rounded-2xl border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: easing }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              >
                <div
                  className="font-display font-bold text-2xl tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {s.val}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — info cards */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easing }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border p-5"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border)",
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easing }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "var(--accent-bg)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                }}
              >
                <item.icon size={16} strokeWidth={1.75} />
              </div>
              <div>
                <div
                  className="font-medium text-sm mb-0.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </div>
                <div className="text-sm font-light" style={{ color: "var(--text-muted)" }}>
                  {item.desc}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Process philosophy */}
          <motion.div
            className="rounded-2xl border p-6 mt-2"
            style={{
              backgroundColor: "var(--accent-bg)",
              borderColor: "var(--accent-border)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: easing }}
          >
            <div
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "var(--accent)" }}
            >
              {t("about.philosophy.label")}
            </div>
            <p
              className="text-sm leading-relaxed font-light italic"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("about.philosophy.quote")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
