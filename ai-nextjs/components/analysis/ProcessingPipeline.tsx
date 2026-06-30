"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Database, CheckCircle2, ArrowRight } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Ingest",
    desc: "CSV upload or direct text input parsed and validated",
    color: "var(--secondary)",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Analyze",
    desc: "DistilBERT model classifies sentiment with confidence score",
    color: "var(--primary)",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    step: "03",
    icon: Database,
    title: "Persist",
    desc: "Results committed to PostgreSQL with timestamps",
    color: "var(--violet)",
    glow: "rgba(139,92,246,0.25)",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Visualize",
    desc: "Dashboard KPIs, charts, and executive summary updated",
    color: "var(--positive)",
    glow: "rgba(16,185,129,0.25)",
  },
];

export default function ProcessingPipeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle
        title="Processing Pipeline"
        subtitle="How raw feedback becomes actionable insight"
        label="Architecture"
      />

      <GlowCard className="p-8" hover={false}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.75rem",
          alignItems: "start",
          position: "relative",
        }}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} style={{ display: "contents" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  style={{
                    borderRadius: 18,
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    padding: "1.5rem",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 12, right: 14,
                    fontSize: "0.7rem", fontWeight: 800,
                    color: "var(--text-3)", letterSpacing: "0.05em",
                  }}>
                    {s.step}
                  </div>

                  <div style={{
                    width: 56, height: 56, borderRadius: 16, margin: "0 auto 1rem",
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 8px 20px ${s.glow}`,
                  }}>
                    <Icon size={24} style={{ color: s.color }} />
                  </div>

                  <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.825rem", color: "var(--text-3)", lineHeight: 1.6 }}>{s.desc}</p>

                  {/* Animated indicator */}
                  <div style={{ marginTop: "1rem", height: 4, borderRadius: 99, background: "var(--surface-3)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 99, background: s.color }}
                    />
                  </div>
                </motion.div>

                {i < steps.length - 1 && (
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-3)",
                  }} className="hidden lg:flex">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlowCard>
    </motion.div>
  );
}
