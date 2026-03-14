"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";
import type { Project } from "@/lib/projects";

const MotionLink = motion(Link);

const easing = [0.16, 1, 0.3, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionLink
      href={`/portfolio/${project.slug}`}
      className="group block rounded-2xl border overflow-hidden"
      style={{
        borderColor: hovered ? "var(--border-strong)" : "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundColor: project.color,
          height: "200px",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div
            className="w-full h-full rounded-xl border flex flex-col gap-3 p-5"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: i === 0 ? project.accent : "rgba(255,255,255,0.15)" }}
                  />
                ))}
              </div>
              <div className="w-20 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            </div>
            <div className="flex-1 flex flex-col gap-2 mt-2">
              <motion.div
                className="h-5 rounded-md"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                animate={hovered ? { width: "80%" } : { width: "66.666%" }}
                transition={{ duration: 0.4 }}
              />
              <div className="h-3 w-full rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              <div className="h-3 w-4/5 rounded" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              <div className="h-3 w-1/2 rounded mt-1" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
            </div>
            <motion.div
              className="self-start px-4 py-2 rounded-full text-xs font-medium"
              style={{ backgroundColor: project.accent, color: "#0a0a0a", opacity: 0.9 }}
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              View →
            </motion.div>
          </div>
        </div>

        <div
          className="absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full font-medium"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {project.type}
        </div>

        <motion.div
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backdropFilter: "blur(8px)" }}
          animate={
            hovered
              ? { backgroundColor: project.accent, color: "#0a0a0a", scale: 1, opacity: 1, rotate: -45 }
              : { backgroundColor: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.6)", scale: 0.8, opacity: 0.5, rotate: 0 }
          }
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={14} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "var(--accent)" }}>
          {project.type}
        </div>
        <h3 className="font-display font-bold text-lg leading-tight mb-2.5" style={{ color: "var(--text-primary)" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 font-light" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </MotionLink>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [featured, ...rest] = projects;
  const { t } = useLang();

  if (!featured) return null;

  return (
    <section id="works" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        className="flex items-end justify-between mb-14 gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easing }}
      >
        <div>
          <span className="text-xs uppercase tracking-widest font-medium block mb-3" style={{ color: "var(--accent)" }}>
            {t("projects.eyebrow")}
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            {t("projects.heading")}
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 text-sm border-b pb-0.5 transition-opacity hover:opacity-60 shrink-0"
          style={{ color: "var(--text-secondary)", borderColor: "var(--border-strong)" }}
        >
          {t("projects.all")}
          <ArrowUpRight size={14} />
        </a>
      </motion.div>

      {/* Featured */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: easing }}
      >
        <MotionLink
          href={`/portfolio/${featured.slug}`}
          className="group grid grid-cols-1 md:grid-cols-5 rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
          <div
            className="md:col-span-3 relative overflow-hidden min-h-64"
            style={{ backgroundColor: featured.color }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div
                className="w-full h-full rounded-2xl border flex flex-col gap-4 p-6"
                style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: i === 0 ? featured.accent : "rgba(255,255,255,0.15)" }} />
                  ))}
                  <div className="flex-1 h-2 rounded-full ml-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-6 w-3/4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
                  <div className="h-3 w-full rounded" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
                  <div className="h-3 w-5/6 rounded" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
                  <div className="h-3 w-4/6 rounded" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="px-5 py-2.5 rounded-full text-xs font-bold" style={{ backgroundColor: featured.accent, color: "#000" }}>
                    View Case Study
                  </div>
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                </div>
              </div>
            </div>
            <div
              className="absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {t("projects.featured")}
            </div>
          </div>

          <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "var(--accent)" }}>
              {featured.type}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
              {featured.title}
            </h3>
            <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: "var(--text-secondary)" }}>
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {featured.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: "var(--accent)" }}>
              View case study
              <ArrowUpRight size={15} />
            </div>
          </div>
        </MotionLink>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
