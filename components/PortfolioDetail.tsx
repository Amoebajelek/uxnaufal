"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const easing = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: easing },
  };
}

/* ─── Mock screen visual (reused from Projects) ─── */
function MockScreen({ color, accent }: { color: string; accent: string }) {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ backgroundColor: color, aspectRatio: "16/9" }}
    >
      <div className="w-full h-full flex items-center justify-center p-10">
        <div
          className="w-full h-full rounded-xl border flex flex-col gap-4 p-6"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        >
          {/* Nav bar mock */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: i === 0 ? accent : "rgba(255,255,255,0.15)" }}
              />
            ))}
            <div className="flex-1 h-2.5 rounded-full ml-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            <div className="w-16 h-6 rounded-lg" style={{ backgroundColor: accent, opacity: 0.9 }} />
          </div>
          {/* Hero mock */}
          <div className="flex-1 flex gap-6 mt-2">
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-8 w-3/4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.14)" }} />
              <div className="h-4 w-full rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
              <div className="h-4 w-5/6 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
              <div className="h-4 w-2/3 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
              <div className="flex gap-2 mt-2">
                <div className="h-9 w-28 rounded-full" style={{ backgroundColor: accent }} />
                <div className="h-9 w-24 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.2)" }} />
              </div>
            </div>
            <div
              className="w-2/5 rounded-2xl hidden md:block"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
          {/* Cards row */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-12 rounded-xl"
                style={{
                  backgroundColor: i === 0 ? `${accent}22` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${i === 0 ? `${accent}33` : "rgba(255,255,255,0.08)"}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section renderers ─── */
function MetricsSection({ section, accent }: { section: Project["sections"][0]; accent: string }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.title} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {section.items?.map((item, i) => (
          <motion.div
            key={item.label}
            className="rounded-2xl border p-6 text-center"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: easing }}
            whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          >
            <div className="font-display font-extrabold text-3xl tracking-tight mb-1" style={{ color: accent }}>
              {item.value}
            </div>
            <div className="font-medium text-sm mb-1" style={{ color: "var(--text-primary)" }}>
              {item.label}
            </div>
            {item.desc && (
              <div className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
                {item.desc}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function TextSection({ section }: { section: Project["sections"][0] }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.title} />
      <p className="text-base md:text-lg leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
        {section.content}
      </p>
    </motion.div>
  );
}

function ProcessSection({ section, accent }: { section: Project["sections"][0]; accent: string }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.title} />
      <div className="flex flex-col gap-0">
        {section.steps?.map((step, i) => (
          <motion.div
            key={step.title}
            className="flex gap-6 pb-8 relative"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: easing }}
          >
            {/* Timeline line */}
            {i < (section.steps?.length ?? 0) - 1 && (
              <div
                className="absolute left-5 top-12 bottom-0 w-px"
                style={{ backgroundColor: "var(--border)" }}
              />
            )}
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5 z-10"
              style={{
                backgroundColor: "var(--accent-bg)",
                border: "1px solid var(--accent-border)",
                color: "var(--accent)",
              }}
            >
              {step.icon}
            </div>
            {/* Content */}
            <div className="flex-1">
              <div className="font-display font-semibold text-base mb-1.5" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </div>
              <p className="text-sm leading-relaxed font-light mb-3" style={{ color: "var(--text-secondary)" }}>
                {step.desc}
              </p>
              {step.tools && (
                <div className="flex flex-wrap gap-2">
                  {step.tools.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FeaturesSection({ section }: { section: Project["sections"][0] }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.features?.map((f, i) => (
          <motion.div
            key={f.title}
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: easing }}
            whileHover={{ y: -4, borderColor: "var(--accent-border)", transition: { duration: 0.2 } }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm mb-4"
              style={{
                backgroundColor: "var(--accent-bg)",
                border: "1px solid var(--accent-border)",
                color: "var(--accent)",
              }}
            >
              {f.icon}
            </div>
            <div className="font-display font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
              {f.title}
            </div>
            <p className="text-sm leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function QuoteSection({ section }: { section: Project["sections"][0] }) {
  return (
    <motion.div
      className="rounded-2xl border p-8 md:p-10"
      style={{ backgroundColor: "var(--accent-bg)", borderColor: "var(--accent-border)" }}
      {...fadeUp(0)}
    >
      <div className="text-4xl mb-4" style={{ color: "var(--accent)", lineHeight: 1 }}>
        "
      </div>
      <p className="text-lg md:text-xl leading-relaxed font-light italic mb-4" style={{ color: "var(--text-primary)" }}>
        {section.quote}
      </p>
      {section.author && (
        <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          — {section.author}
        </div>
      )}
    </motion.div>
  );
}

function SectionLabel({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <div className="mb-8">
      <span
        className="text-xs uppercase tracking-widest font-medium block mb-2"
        style={{ color: "var(--accent)" }}
      >
        ◈ Section
      </span>
      <h2
        className="font-display font-bold text-2xl md:text-3xl tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </h2>
    </div>
  );
}

/* ─── Main component ─── */
export function PortfolioDetail({ project }: { project: Project }) {
  const meta = [
    { icon: Calendar, label: "Year", value: project.year },
    { icon: Clock, label: "Duration", value: project.duration },
    { icon: User, label: "Role", value: project.role },
    { icon: Building2, label: "Client", value: project.client },
  ];

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Sticky top nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg) 88%, transparent)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </Link>
          <Link
            href="/"
            className="font-display font-extrabold text-base tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            ux<span style={{ color: "var(--accent)" }}>naufal</span>
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-6 md:px-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          {/* Type badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easing }}
          >
            <span
              className="text-xs px-3 py-1.5 rounded-full border font-medium"
              style={{ borderColor: "var(--accent-border)", color: "var(--accent)", backgroundColor: "var(--accent-bg)" }}
            >
              {project.type}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {project.year}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: easing }}
          >
            {project.title}
          </motion.h1>

          {/* Long desc */}
          <motion.p
            className="text-base md:text-lg leading-relaxed font-light max-w-2xl mb-10"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: easing }}
          >
            {project.longDesc}
          </motion.p>

          {/* Meta row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: easing }}
          >
            {meta.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border p-4"
                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <m.icon size={13} style={{ color: "var(--accent)" }} />
                  <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
                    {m.label}
                  </span>
                </div>
                <div className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                  {m.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tags + tools */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.32 }}
          >
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--accent-border)", color: "var(--accent)", backgroundColor: "var(--accent-bg)" }}
              >
                {t}
              </span>
            ))}
            {project.tools.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easing }}
        >
          <MockScreen color={project.color} accent={project.accent} />
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-20">
          {project.sections.map((section, i) => {
            if (section.type === "metrics")
              return <MetricsSection key={i} section={section} accent={project.accent} />;
            if (section.type === "text")
              return <TextSection key={i} section={section} />;
            if (section.type === "process")
              return <ProcessSection key={i} section={section} accent={project.accent} />;
            if (section.type === "features")
              return <FeaturesSection key={i} section={section} />;
            if (section.type === "quote")
              return <QuoteSection key={i} section={section} />;
            return null;
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-24 pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: "1px solid var(--border)" }}
          {...fadeUp(0)}
        >
          <div>
            <div className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: "var(--accent)" }}>
              Next step
            </div>
            <div className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>
              Want to see the full case study?
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.externalHref && (
              <a
                href={project.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-85 active:scale-95"
                style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
              >
                View full case study
                <ArrowUpRight size={14} />
              </a>
            )}
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
            >
              <ArrowLeft size={14} />
              All projects
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
