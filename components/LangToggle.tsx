"use client";

import { useLang } from "./LanguageContext";
import { motion } from "framer-motion";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <motion.button
      onClick={() => setLang(lang === "en" ? "id" : "en")}
      className="relative h-8 w-16 rounded-full border text-xs font-semibold overflow-hidden flex items-center px-1 select-none"
      style={{
        borderColor: "var(--border-strong)",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-secondary)",
      }}
      whileTap={{ scale: 0.95 }}
      title="Toggle language"
      aria-label="Toggle language"
    >
      {/* Sliding background pill */}
      <motion.div
        className="absolute w-[44%] h-[68%] rounded-full"
        style={{ backgroundColor: "var(--accent)" }}
        animate={{ x: lang === "en" ? 2 : 28 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <span
        className="relative z-10 w-1/2 text-center transition-colors duration-150"
        style={{ color: lang === "en" ? "#0a0a0a" : "var(--text-muted)" }}
      >
        EN
      </span>
      <span
        className="relative z-10 w-1/2 text-center transition-colors duration-150"
        style={{ color: lang === "id" ? "#0a0a0a" : "var(--text-muted)" }}
      >
        ID
      </span>
    </motion.button>
  );
}
