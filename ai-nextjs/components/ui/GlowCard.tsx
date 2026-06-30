"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "cyan" | "green" | "red" | "none";
  hover?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "primary",
  hover = true,
}: GlowCardProps) {
  const glowShadow =
    glowColor === "primary" ? "0 0 50px rgba(99,102,241,0.2)" :
    glowColor === "cyan"    ? "0 0 50px rgba(6,182,212,0.2)" :
    glowColor === "green"   ? "0 0 50px rgba(16,185,129,0.15)" :
    glowColor === "red"     ? "0 0 50px rgba(239,68,68,0.15)" : "";

  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.005 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`
        relative rounded-[20px]
        border backdrop-blur-2xl
        ${className}
      `}
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-2)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `var(--card-shadow), ${glowShadow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--card-shadow)";
      }}
    >
      {children}
    </motion.div>
  );
}
