"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";

const skills = [
  {
    icon: "◈",
    name: "UX Research",
    desc: "User interviews, usability testing, heuristic evaluation, and synthesizing insights into actionable design decisions.",
    tools: ["Maze", "Hotjar", "FigJam"],
  },
  {
    icon: "✦",
    name: "UI Design",
    desc: "High-fidelity interfaces, design systems, component libraries, and pixel-perfect visual execution.",
    tools: ["Figma", "Framer", "Principle"],
  },
  {
    icon: "◉",
    name: "UX Laws",
    desc: "Applying Hick's Law, Fitts's Law, Jakob's Law, and other cognitive principles to every design decision.",
    tools: ["Gestalt", "Nielsen", "Don Norman"],
  },
  {
    icon: "⊕",
    name: "Prototyping",
    desc: "Interactive prototypes for user testing, stakeholder presentations, and developer specification.",
    tools: ["Figma", "ProtoPie", "InVision"],
  },
  {
    icon: "⊗",
    name: "Design System",
    desc: "Building and maintaining scalable design systems with consistent tokens, components, and documentation.",
    tools: ["Tokens Studio", "Storybook", "Zeroheight"],
  },
  {
    icon: "⊞",
    name: "Handoff & Docs",
    desc: "Developer-ready specs, component documentation, and seamless design-to-development workflows.",
    tools: ["Notion", "Zeplin", "Confluence"],
  },
];

const easing = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  const { t } = useLang();

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-14 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <div>
            <span
              className="text-xs uppercase tracking-widest font-medium block mb-3"
              style={{ color: "var(--accent)" }}
            >
              {t("skills.eyebrow")}
            </span>
            <h2
              className="font-display font-bold text-4xl md:text-5xl tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {t("skills.heading")}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              className="rounded-2xl border p-7 group cursor-default"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: easing }}
              whileHover={{
                y: -6,
                borderColor: "var(--accent-border)",
                backgroundColor: "var(--accent-bg)",
                transition: { duration: 0.25 },
              }}
            >
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-5"
                style={{
                  backgroundColor: "var(--accent-bg)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                }}
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
              >
                {s.icon}
              </motion.div>

              <h3
                className="font-display font-semibold text-base mb-2.5"
                style={{ color: "var(--text-primary)" }}
              >
                {s.name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5 font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {s.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: "var(--border-strong)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
