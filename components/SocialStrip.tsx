"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { name: "LinkedIn", handle: "naufalabdussyakur", count: null, href: "https://www.linkedin.com/in/naufalabdussyakur/" },
  { name: "Instagram", handle: "@uxnaufal", count: "500K+", href: "https://www.instagram.com/uxnaufal" },
  { name: "Threads", handle: "@uxnaufal", count: "400K+", href: "https://www.threads.com/@uxnaufal" },
  { name: "TikTok", handle: "@uxnaufal", count: "300K+", href: "https://www.tiktok.com/@uxnaufal" },
];

// Duplicate for seamless marquee loop
const items = [...socials, ...socials];

export function SocialStrip() {
  return (
    <div
      className="border-t border-b overflow-hidden w-full"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "max-content" }}
      >
        {items.map((s, idx) => (
          <a
            key={`${s.name}-${idx}`}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-5 shrink-0 group transition-opacity duration-200 hover:opacity-70"
            style={{
              borderRight: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {s.name}
            </span>
            {s.count && (
              <span className="text-sm font-bold font-display" style={{ color: "var(--accent)" }}>
                {s.count}
              </span>
            )}
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {s.handle}
            </span>
            <ExternalLink
              size={12}
              className="opacity-0 group-hover:opacity-60 transition-opacity ml-1"
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
}
