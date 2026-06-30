"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MessageSquare, Smile, Meh, Frown } from "lucide-react";
import GlowCard from "../ui/GlowCard";

interface Props {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

const cards = [
  {
    title: "Total Analyzed",
    key: "total" as const,
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6,182,212,0.3)",
    icon: MessageSquare,
    bg: "rgba(6,182,212,0.1)",
    barColor: "linear-gradient(90deg, #06b6d4, #3b82f6)",
  },
  {
    title: "Positive",
    key: "positive" as const,
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    glow: "rgba(16,185,129,0.3)",
    icon: Smile,
    bg: "rgba(16,185,129,0.1)",
    barColor: "linear-gradient(90deg, #10b981, #34d399)",
  },
  {
    title: "Neutral",
    key: "neutral" as const,
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    glow: "rgba(245,158,11,0.3)",
    icon: Meh,
    bg: "rgba(245,158,11,0.1)",
    barColor: "linear-gradient(90deg, #f59e0b, #fbbf24)",
  },
  {
    title: "Negative",
    key: "negative" as const,
    gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    glow: "rgba(239,68,68,0.3)",
    icon: Frown,
    bg: "rgba(239,68,68,0.1)",
    barColor: "linear-gradient(90deg, #ef4444, #f87171)",
  },
];

export default function KPICards({ total, positive, neutral, negative }: Props) {
  const values = { total, positive, neutral, negative };

  return (
    <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        const value = values[card.key];
        const pct = total > 0 ? (value / total) * 100 : 0;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <GlowCard className="p-6 overflow-hidden" glowColor={card.key === "positive" ? "green" : card.key === "negative" ? "red" : "primary"}>
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {card.title}
                  </p>
                  <h2 style={{
                    marginTop: "0.6rem",
                    fontSize: "2.75rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--text)",
                    lineHeight: 1,
                  }}>
                    <CountUp end={value} duration={2} separator="," />
                  </h2>
                </div>

                <div style={{
                  width: 48, height: 48,
                  borderRadius: 14,
                  background: card.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 8px 20px ${card.glow}`,
                  flexShrink: 0,
                }}>
                  <Icon size={22} color="white" />
                </div>
              </div>

              {/* Percentage */}
              {total > 0 && (
                <p style={{ marginTop: "0.6rem", fontSize: "0.825rem", color: "var(--text-3)" }}>
                  <span style={{ color: "var(--text-2)", fontWeight: 600 }}>{pct.toFixed(1)}%</span> of total
                </p>
              )}

              {/* Bar */}
              <div style={{
                marginTop: "1.25rem",
                height: 6,
                borderRadius: 99,
                background: "var(--surface-3)",
                overflow: "hidden",
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 99, background: card.barColor }}
                />
              </div>
            </GlowCard>
          </motion.div>
        );
      })}
    </div>
  );
}
