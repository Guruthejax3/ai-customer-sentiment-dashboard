"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  label?: string;
}

export default function SectionTitle({ icon, title, subtitle, label }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-7"
    >
      {label && (
        <p className="section-label">{label}</p>
      )}
      <div className="flex items-center gap-3">
        {icon && (
          <div style={{
            width: 40, height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white",
            flexShrink: 0,
            boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
          }}>
            {icon}
          </div>
        )}
        <div>
          <h2 style={{ color: "var(--text)", fontSize: "1.35rem", fontWeight: 700 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: "var(--text-2)", fontSize: "0.875rem", marginTop: "0.15rem" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
