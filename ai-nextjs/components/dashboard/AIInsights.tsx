"use client";

import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Truck, Package, Headphones, Lightbulb } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";

const insights = [
  { icon: TrendingUp,  title: "Customer Health Score", value: "92 / 100", trend: "+4",  color: "var(--positive)", bg: "rgba(16,185,129,0.1)" },
  { icon: Truck,       title: "Delivery Complaints",   value: "18%",       trend: "-2",  color: "var(--negative)", bg: "rgba(239,68,68,0.08)" },
  { icon: Package,     title: "Product Quality",       value: "Excellent", trend: null,  color: "var(--secondary)",bg: "rgba(6,182,212,0.08)" },
  { icon: Headphones,  title: "Support Rating",        value: "4.8 / 5",  trend: "+0.2",color: "var(--primary)",  bg: "rgba(99,102,241,0.08)" },
];

const recommendations = [
  "Improve last-mile delivery logistics to cut complaint rate by ~40%.",
  "Maintain current support team quality — customers notice the response speed.",
  "Monitor damaged packaging incidents — spike detected in last 7 days.",
  "Leverage positive reviews in marketing campaigns for max social proof.",
];

export default function AIInsights() {
  return (
    <GlowCard className="p-7 h-full">
      <SectionTitle
        icon={<BrainCircuit size={18} />}
        title="AI Insights"
        subtitle="Business intelligence from sentiment patterns"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1.25rem" }}>
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: item.bg,
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <Icon size={20} style={{ color: item.color }} />
                {item.trend && (
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700,
                    color: item.trend.startsWith("+") ? "var(--positive)" : "var(--negative)",
                    background: item.trend.startsWith("+") ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                    padding: "0.15rem 0.45rem",
                    borderRadius: 6,
                  }}>
                    {item.trend}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "0.25rem" }}>{item.title}</p>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>{item.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div style={{
        borderRadius: 16,
        border: "1px solid rgba(6,182,212,0.2)",
        background: "rgba(6,182,212,0.05)",
        padding: "1.25rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
          <Lightbulb size={16} color="var(--secondary)" />
          <h3 style={{ fontWeight: 700, color: "var(--secondary)", fontSize: "0.875rem" }}>AI Recommendations</h3>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {recommendations.map((r, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                display: "flex",
                gap: "0.6rem",
                fontSize: "0.85rem",
                color: "var(--text-2)",
                lineHeight: 1.6,
                listStyle: "none",
              }}
            >
              <span style={{ color: "var(--secondary)", fontWeight: 700, flexShrink: 0 }}>→</span>
              {r}
            </motion.li>
          ))}
        </ul>
      </div>
    </GlowCard>
  );
}
