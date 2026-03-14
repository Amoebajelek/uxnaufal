"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "./LanguageContext";

const floatingShapes = [
  { size: 320, x: "72%", y: "8%", delay: 0, duration: 8 },
  { size: 200, x: "85%", y: "55%", delay: 1.5, duration: 10 },
  { size: 140, x: "60%", y: "75%", delay: 3, duration: 7 },
  { size: 80, x: "10%", y: "20%", delay: 0.5, duration: 9 },
];

const easing = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stats = [
    { label: t("hero.stat1.label"), value: t("hero.stat1.value"), accent: true },
    { label: t("hero.stat2.label"), value: t("hero.stat2.value") },
    { label: t("hero.stat3.label"), value: t("hero.stat3.value") },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-10 max-w-6xl mx-auto overflow-visible"
    >
      {/* Floating background orbs */}
      {floatingShapes.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
            opacity: 0.08,
            y: i % 2 === 0 ? y1 : y2,
          }}
          animate={{
            scale: [1, 1.12, 1],
            x: [0, 12, -8, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">
        {/* Left */}
        <div className="lg:col-span-3">
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
            <span
              className="text-xs tracking-widest uppercase font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.03] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easing }}
          >
            {t("hero.heading1")}
            <br />
            <span style={{ color: "var(--accent)" }}>{t("hero.heading2")}</span>
            <br />
            {t("hero.heading3")}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-md mb-10 font-light"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: easing }}
          >
            {t("hero.desc")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: easing }}
          >
            <a
              href="#works"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5 active:scale-95"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              {t("hero.cta.work")}
              <ArrowRight size={15} strokeWidth={2} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border transition-all duration-200 hover:opacity-80"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-secondary)",
              }}
            >
              {t("hero.cta.about")}
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </a>
          </motion.div>
        </div>

        {/* Right — stat cards */}
        <motion.div
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easing }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center justify-between rounded-2xl p-6 border cursor-default"
              style={{
                backgroundColor: s.accent ? "var(--accent-bg)" : "var(--bg-secondary)",
                borderColor: s.accent ? "var(--accent-border)" : "var(--border)",
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: easing }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-1.5 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.label}
                </div>
                <div
                  className="font-display font-bold text-3xl tracking-tight"
                  style={{ color: s.accent ? "var(--accent)" : "var(--text-primary)" }}
                >
                  {s.value}
                </div>
              </div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                style={{
                  backgroundColor: s.accent ? "rgba(200,255,87,0.12)" : "var(--bg-surface)",
                  color: s.accent ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {s.accent ? "✦" : "◉"}
              </div>
            </motion.div>
          ))}

          {/* Social proof mini */}
          <motion.div
            className="rounded-2xl border p-5 flex items-center justify-between"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: easing }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {t("hero.find")}
            </span>
            <div className="flex gap-3">
              {["Instagram", "TikTok", "Threads"].map((s) => (
                <motion.span
                  key={s}
                  className="text-xs px-3 py-1.5 rounded-full border"
                  style={{
                    borderColor: "var(--border-strong)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="flex items-center gap-3 mt-20 md:mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="h-px flex-1 max-w-16" style={{ backgroundColor: "var(--border-strong)" }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          {t("hero.scroll")}
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
