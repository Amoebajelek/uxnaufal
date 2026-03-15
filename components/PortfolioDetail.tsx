"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project, ProjectSection } from "@/lib/projects";
import { useLang } from "@/components/LanguageContext";
import { LangToggle } from "@/components/LangToggle";

/* ─── Convert label → DOM id ─── */
function labelToId(label: string): string {
  return "section-" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const easing = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: easing },
  };
}

/* ─── Section label (e.g. "Problem #1", "Solution #2") ─── */
function SectionLabel({ label, accent }: { label?: string; accent: string }) {
  if (!label) return null;
  return (
    <p className="text-base font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
      {label}
    </p>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ text }: { text: string }) {
  return (
    <h2
      className="font-display font-bold text-2xl md:text-3xl uppercase leading-tight mb-4"
      style={{ color: "var(--text-primary)" }}
    >
      {text}
    </h2>
  );
}

/* ─── Body text ─── */
function BodyText({ text }: { text: string }) {
  return (
    <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
      {text}
    </p>
  );
}

/* ─── Divider ─── */
function Divider() {
  return <div className="w-full h-px my-10" style={{ backgroundColor: "var(--border)" }} />;
}

/* ─── In a Nutshell ─── */
function NutshellSection({ section, accent }: { section: ProjectSection; accent: string }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.label} accent={accent} />
      <SectionHeading text={section.heading} />
      {section.content && <BodyText text={section.content} />}
    </motion.div>
  );
}

/* ─── Context with image + definition list ─── */
function ContextSection({ section, accent }: { section: ProjectSection; accent: string }) {
  const { t } = useLang();
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.label} accent={accent} />
      <SectionHeading text={section.heading} />
      {section.content && <BodyText text={section.content} />}

      {section.image && (
        <motion.div
          className="w-full rounded-2xl overflow-hidden my-6"
          style={{ backgroundColor: "var(--bg-secondary)" }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <Image
            src={section.image}
            alt={section.heading}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      )}

      {section.boldList && (
        <div className="mt-4">
          <p className="text-base mb-3" style={{ color: "var(--text-secondary)" }}>
            {t("portfolio.context.flow")}
          </p>
          <ol className="list-decimal ml-6 space-y-2">
            {section.boldList.map((item, i) => (
              <motion.li
                key={i}
                className="text-base"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: easing }}
              >
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.term}
                </span>
                {" "}— {item.desc}
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Problem Discovery ─── */
function ProblemDiscoverySection({ section, accent }: { section: ProjectSection; accent: string }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.label} accent={accent} />
      <SectionHeading text={section.heading} />
      {section.content && <BodyText text={section.content} />}
    </motion.div>
  );
}

/* ─── Problem (numbered, with optional image) ─── */
function ProblemSection({ section, accent }: { section: ProjectSection; accent: string }) {
  const { t } = useLang();
  return (
    <motion.div {...fadeUp(0)}>
      <div
        className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full mb-4"
        style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        {section.label}
      </div>
      <SectionHeading text={section.heading} />
      {section.content && <BodyText text={section.content} />}

      {section.image && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{t("portfolio.problem.preview")}</p>
          <motion.div
            className="w-full rounded-xl overflow-hidden"
            style={{ backgroundColor: "var(--bg-secondary)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
          >
            <Image
              src={section.image}
              alt={section.heading}
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Solution ─── */
function SolutionSection({ section, accent }: { section: ProjectSection; accent: string }) {
  return (
    <motion.div
      className="rounded-2xl border p-6 md:p-8"
      style={{ backgroundColor: "var(--accent-bg)", borderColor: "var(--accent-border)" }}
      {...fadeUp(0)}
    >
      <div
        className="inline-block text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full mb-4"
        style={{ backgroundColor: "var(--accent-bg)", color: accent, border: `1px solid ${accent}33` }}
      >
        {section.label}
      </div>
      <SectionHeading text={section.heading} />
      {section.content && <BodyText text={section.content} />}
    </motion.div>
  );
}

/* ─── Final Design (image gallery) ─── */
function FinalDesignSection({ section, accent }: { section: ProjectSection; accent: string }) {
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.label} accent={accent} />
      <SectionHeading text={section.heading} />

      <div className="flex flex-col gap-8 mt-6">
        {section.items?.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: easing }}
          >
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {item.label}
            </p>
            <div
              className="w-full rounded-xl overflow-hidden"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <Image
                src={item.image}
                alt={item.label}
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Reflection ─── */
function ReflectionSection({ section, accent }: { section: ProjectSection; accent: string }) {
  const { t } = useLang();
  return (
    <motion.div {...fadeUp(0)}>
      <SectionLabel label={section.label} accent={accent} />
      <SectionHeading text={section.heading} />
      {section.content && (
        <p className="text-base mb-4" style={{ color: "var(--text-secondary)" }}>{section.content}</p>
      )}

      {section.learnings && (
        <ul className="list-disc ml-6 space-y-2 mb-6">
          {section.learnings.map((l, i) => (
            <motion.li
              key={i}
              className="text-base"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              {l}
            </motion.li>
          ))}
        </ul>
      )}

      {section.collaborators && section.collaborators.length > 0 && (
        <div className="mt-4">
          <p className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            {t("portfolio.reflection.collabTitle")}
          </p>
          <p className="text-base mb-2" style={{ color: "var(--text-secondary)" }}>
            {t("portfolio.reflection.collabDesc")}
          </p>
          <ul className="list-disc ml-6 space-y-1">
            {section.collaborators.map((c, i) => (
              <li key={i} className="text-base" style={{ color: "var(--text-secondary)" }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Notion-only placeholder ─── */
function NotionOnlySection({ section, accent, externalHref }: { section: ProjectSection; accent: string; externalHref?: string }) {
  const { t } = useLang();
  return (
    <motion.div
      className="flex flex-col items-center text-center py-16 px-8 rounded-2xl border"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      {...fadeUp(0)}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
        style={{ backgroundColor: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
      >
        📋
      </div>
      <h2
        className="font-display font-bold text-xl md:text-2xl mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {section.heading}
      </h2>
      <p
        className="text-base leading-relaxed max-w-lg mb-8"
        style={{ color: "var(--text-secondary)" }}
      >
        {section.content}
      </p>
      {externalHref && (
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-85 active:scale-95"
          style={{ backgroundColor: accent, color: "#0a0a0a" }}
        >
          {t("portfolio.notion.button")}
          <ArrowUpRight size={15} />
        </a>
      )}
    </motion.div>
  );
}

/* ─── Section renderer ─── */
function RenderSection({
  section,
  accent,
  externalHref,
}: {
  section: ProjectSection;
  accent: string;
  externalHref?: string;
}) {
  switch (section.type) {
    case "nutshell":
      return <NutshellSection section={section} accent={accent} />;
    case "context":
      return <ContextSection section={section} accent={accent} />;
    case "problem-discovery":
      return <ProblemDiscoverySection section={section} accent={accent} />;
    case "problem":
      return <ProblemSection section={section} accent={accent} />;
    case "solution":
      return <SolutionSection section={section} accent={accent} />;
    case "finaldesign":
      return <FinalDesignSection section={section} accent={accent} />;
    case "reflection":
      return <ReflectionSection section={section} accent={accent} />;
    case "notion-only":
      return <NotionOnlySection section={section} accent={accent} externalHref={externalHref} />;
    default:
      return null;
  }
}

/* ─── Reading progress bar (top of viewport) ─── */
function ReadingProgress({ accent }: { accent: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[3px] transition-all duration-75"
      style={{ width: `${progress}%`, backgroundColor: accent }}
    />
  );
}

/* ─── Sidebar nav ─── */
function SidebarNav({ sections, accent }: { sections: ProjectSection[]; accent: string }) {
  const { t }   = useLang();
  const labels  = sections.map((s) => s.label).filter(Boolean) as string[];
  const [activeId, setActiveId]     = useState<string>("");
  const [readProgress, setReadProgress] = useState(0);

  /* scroll progress */
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* active section observer */
  useEffect(() => {
    if (labels.length < 3) return;
    const ids = labels.map(labelToId);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  if (labels.length < 3) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <div className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-24 flex flex-col gap-0">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[11px] uppercase tracking-[0.12em] font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            {t("portfolio.sidebar.title")}
          </span>
          <span
            className="text-[11px] font-medium tabular-nums"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            {Math.round(readProgress)}%
          </span>
        </div>

        {/* Progress track */}
        <div
          className="w-full h-px mb-4 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{ width: `${readProgress}%`, backgroundColor: accent }}
          />
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5">
          {labels.map((label, idx) => {
            const id       = labelToId(label);
            const isActive = activeId === id;
            return (
              <a
                key={label}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  textDecoration:  "none",
                  backgroundColor: isActive ? `${accent}14` : "transparent",
                  color:           isActive ? "var(--text-primary)" : "var(--text-muted)",
                }}
              >
                {/* Step number dot */}
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? accent                    : "var(--bg-secondary)",
                    color:           isActive ? "#0a0a0a"                 : "var(--text-muted)",
                    border:          isActive ? "none"                    : "1px solid var(--border)",
                    boxShadow:       isActive ? `0 0 0 3px ${accent}22`  : "none",
                  }}
                >
                  {idx + 1}
                </span>

                {/* Label */}
                <span
                  className="leading-snug transition-all duration-200 flex-1 min-w-0 truncate"
                  style={{
                    fontWeight: isActive ? 500 : 400,
                    opacity:    isActive ? 1   : 0.6,
                  }}
                >
                  {label}
                </span>

                {/* Active arrow */}
                {isActive && (
                  <span
                    className="text-[10px] font-bold shrink-0"
                    style={{ color: accent, opacity: 0.8 }}
                  >
                    ›
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Scroll to top */}
        {readProgress > 20 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200 hover:opacity-80 w-full"
            style={{
              color:           "var(--text-muted)",
              backgroundColor: "var(--bg-secondary)",
              border:          "1px solid var(--border)",
            }}
          >
            <span style={{ opacity: 0.6 }}>↑</span>
            {t("portfolio.sidebar.backtop")}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export function PortfolioDetail({ project }: { project: Project }) {
  const { t } = useLang();

  const isNotionOnly =
    project.sections.length === 1 && project.sections[0].type === "notion-only";

  const meta = [
    project.year     && { icon: Calendar,  label: t("portfolio.meta.year"),     value: project.year },
    project.duration && { icon: Clock,     label: t("portfolio.meta.duration"), value: project.duration },
    project.role     && { icon: User,      label: t("portfolio.meta.role"),     value: project.role },
    project.client   && { icon: Building2, label: t("portfolio.meta.client"),   value: project.client },
  ].filter(Boolean) as { icon: typeof Calendar; label: string; value: string }[];

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Reading progress bar */}
      <ReadingProgress accent={project.accent} />

      {/* Sticky nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg) 88%, transparent)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={15} />
            {t("portfolio.back")}
          </Link>
          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              href="/"
              className="font-display font-extrabold text-base tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              ux<span style={{ color: "var(--accent)" }}>naufal</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-6 md:px-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-12">
          {/* Type badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easing }}
          >
            <span
              className="text-xs px-3 py-1.5 rounded-full border font-medium"
              style={{
                borderColor: "var(--accent-border)",
                color: "var(--accent)",
                backgroundColor: "var(--accent-bg)",
              }}
            >
              {project.type}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {project.year}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase mb-5"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.07, ease: easing }}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-8"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: easing }}
          >
            {project.description}
          </motion.p>

          {/* Skills tags */}
          {project.skills && (
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          )}

          {/* Meta row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: easing }}
          >
            {meta.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border p-4"
                style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <m.icon size={12} style={{ color: "var(--accent)" }} />
                  <span
                    className="text-xs uppercase tracking-widest font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {m.label}
                  </span>
                </div>
                <div
                  className="font-display font-semibold text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {m.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: "var(--accent-border)",
                  color: "var(--accent)",
                  backgroundColor: "var(--accent-bg)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Thumbnail ── */}
        {project.thumbnail && (
          <motion.div
            className="mb-14 w-full rounded-2xl overflow-hidden"
            style={{ backgroundColor: project.color }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.18, ease: easing }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        )}

        {/* ── Body: sidebar + content ── */}
        <div className="flex gap-14 items-start">
          {!isNotionOnly && <SidebarNav sections={project.sections} accent={project.accent} />}

          <div className="flex-1 flex flex-col gap-0">
            {project.sections.map((section, i) => (
              <div
                key={i}
                id={section.label ? labelToId(section.label) : undefined}
              >
                <RenderSection
                  section={section}
                  accent={project.accent}
                  externalHref={project.externalHref}
                />
                {i < project.sections.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        {!isNotionOnly && (
          <motion.div
            className="mt-20 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ borderTop: "1px solid var(--border)" }}
            {...fadeUp(0)}
          >
            <div>
              <div
                className="text-xs uppercase tracking-widest font-medium mb-1.5"
                style={{ color: "var(--accent)" }}
              >
                {t("portfolio.cta.label")}
              </div>
              <div
                className="font-display font-bold text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                {t("portfolio.cta.heading")}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-85 active:scale-95 border"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                >
                  {t("portfolio.cta.live")}
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.externalHref && (
                <a
                  href={project.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-85 active:scale-95"
                  style={{ backgroundColor: project.accent, color: "#0a0a0a" }}
                >
                  {t("portfolio.cta.notion")}
                  <ArrowUpRight size={14} />
                </a>
              )}
              <Link
                href="/#works"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border transition-all hover:opacity-80"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
              >
                <ArrowLeft size={14} />
                {t("portfolio.cta.all")}
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
