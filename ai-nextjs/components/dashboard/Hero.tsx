"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { BrainCircuit, Database, Activity, ShieldCheck, Sparkles, Zap } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import AnimatedButton from "../ui/AnimatedButton";
import StatusBadge from "../ui/StatusBadge";

export default function Hero() {
  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: 28,
      border: "1px solid var(--border)",
      background: "var(--surface)",
      padding: "3rem",
    }} className="grid-bg">

      {/* Aurora orbs */}
      <div className="aurora">
        <div className="aurora-orb aurora-1" />
        <div className="aurora-orb aurora-2" />
        <div className="aurora-orb aurora-3" />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "1fr" }} className="lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <StatusBadge text="AI-Powered · Real-Time · Enterprise" color="blue" pulse />

            <h1 style={{
              marginTop: "1.5rem",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "var(--text)",
              lineHeight: 1.1,
            }}>
              Customer Sentiment
              <br />
              <span className="gradient-text">Intelligence Platform</span>
            </h1>

            <p style={{ marginTop: "1.25rem", maxWidth: 480, fontSize: "1.05rem", lineHeight: 1.75 }}>
              Analyze customer feedback in real-time using Hugging Face DistilBERT.
              Visualize emotion trends, spot risks early, and generate executive insights instantly.
            </p>

            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <div style={{ minWidth: 160 }}>
                <AnimatedButton className="w-auto px-8">
                  <Zap size={16} />
                  Start Analysis
                </AnimatedButton>
              </div>
              <button className="btn-secondary" style={{ width: "auto", padding: "0.75rem 1.75rem" }}>
                Documentation
              </button>
            </div>
          </motion.div>

          {/* Right — AI Health card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <GlowCard className="p-7" hover={false}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--secondary)", textTransform: "uppercase" }}>
                    AI Engine Status
                  </p>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginTop: "0.2rem" }}>
                    System Health
                  </h2>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={22} color="var(--secondary)" />
                </motion.div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                {[
                  { icon: <BrainCircuit size={18} />, label: "Model", value: "DistilBERT" },
                  { icon: <Database size={18} />, label: "Database", value: "Connected" },
                  { icon: <Activity size={18} />, label: "Latency", value: "32 ms" },
                  { icon: <ShieldCheck size={18} />, label: "Status", value: "Healthy" },
                ].map((m) => (
                  <div key={m.label} style={{
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    padding: "1rem",
                  }}>
                    <div style={{ color: "var(--secondary)", marginBottom: "0.5rem" }}>{m.icon}</div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>{m.label}</p>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", marginTop: "0.2rem" }}>{m.value}</h3>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: "1.5rem",
                borderRadius: 14,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                padding: "1.25rem",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)" }}>Model Confidence</span>
                  <span style={{ fontWeight: 700, color: "var(--secondary)" }}>98.4%</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "var(--surface-3)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.4%" }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                    style={{
                      height: "100%",
                      borderRadius: 99,
                      background: "linear-gradient(90deg, var(--secondary), var(--primary))",
                    }}
                  />
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* KPI strip */}
        <div style={{ marginTop: "2.5rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {[
            { label: "Reviews Processed", value: 12045, suffix: "" },
            { label: "Positive Reviews", value: 8420, suffix: "" },
            { label: "Negative Detected", value: 1232, suffix: "" },
            { label: "Avg Confidence", value: 98, suffix: "%" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              style={{
                borderRadius: 16,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "var(--text-3)", fontWeight: 500 }}>{s.label}</p>
              <h2 style={{ marginTop: "0.4rem", fontSize: "2rem", fontWeight: 800, color: "var(--text)" }}>
                <CountUp end={s.value} duration={2.5} separator="," />
                {s.suffix}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
