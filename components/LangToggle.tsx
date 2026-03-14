"use client";

import { useLang } from "./LanguageContext";
import { motion } from "framer-motion";

// Button: w-16 = 64px, h-7 = 28px
// Pill:   width = 64/2 - 4 = 28px  (2px margin each side inside each half)
//         height = 28 - 4 = 24px   (2px margin top/bottom)
//         EN x = 2px  (left margin)
//         ID x = 32 + 2 = 34px     (second half start + left margin)

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <motion.button
      onClick={() => setLang(lang === "en" ? "id" : "en")}
      className="relative h-7 w-16 rounded-full border text-xs font-semibold overflow-hidden select-none cursor-pointer"
      style={{
        borderColor: "var(--border-strong)",
        backgroundColor: "var(--bg-secondary)",
      }}
      whileTap={{ scale: 0.95 }}
      title="Toggle language"
      aria-label="Toggle language"
    >
      {/* Sliding pill — exactly half-width, 2px inset on all sides */}
      <motion.div
        className="absolute top-[2px] rounded-full"
        style={{
          width: 28,
          height: 24,
          backgroundColor: "var(--accent)",
        }}
        animate={{ x: lang === "en" ? 2 : 34 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />

      {/* Labels */}
      <div className="relative z-10 flex h-full">
        <span
          className="w-1/2 flex items-center justify-center transition-colors duration-150"
          style={{ color: lang === "en" ? "#0a0a0a" : "var(--text-muted)" }}
        >
          EN
        </span>
        <span
          className="w-1/2 flex items-center justify-center transition-colors duration-150"
          style={{ color: lang === "id" ? "#0a0a0a" : "var(--text-muted)" }}
        >
          ID
        </span>
      </div>
    </motion.button>
  );
}
