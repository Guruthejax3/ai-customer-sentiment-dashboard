"use client";

import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, AlertTriangle, Target } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";

interface Props {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

export default function ExecutiveSummary({ total, positive, neutral, negative }: Props) {
  const positiveRate = total === 0 ? 0 : Math.round((positive / total) * 100);
  const neutralRate  = total === 0 ? 0 : Math.round((neutral  / total) * 100);
  const negativeRate = total === 0 ? 0 : Math.round((negative / total) * 100);

  const summary =
    positiveRate >= 75
      ? "Overall customer satisfaction is excellent. The vast majority of customers express positive experiences with the product and service quality."
      : positiveRate >= 50
      ? "Customer sentiment is generally positive, but there are meaningful opportunities to reduce friction in key touchpoints."
      : "Customer satisfaction requires immediate strategic attention due to the increasing proportion of negative feedback.";

  const health = positiveRate >= 75 ? "Excellent" : positiveRate >= 50 ? "Moderate" : "At Risk";
  const healthColor = positiveRate >= 75 ? "var(--positive)" : positiveRate >= 50 ? "var(--warning)" : "var(--negative)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <SectionTitle
        icon={<BrainCircuit size={18} />}
        title="Executive Summary"
        subtitle="AI-generated business overview from sentiment data"
        label="Insights"
      />

      <GlowCard className="p-8">
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr" }} className="lg:grid-cols-2">

          {/* Left */}
          <div>
            {/* Health badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: 999,
              background: `${healthColor}18`,
              border: `1px solid ${healthColor}33`,
              marginBottom: "1.25rem",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: healthColor, boxShadow: `0 0 8px ${healthColor}` }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: healthColor }}>
                Customer Health: {health}
              </span>
            </div>

            <p style={{ color: "var(--text-2)", lineHeight: 1.85, fontSize: "1rem" }}>
              {summary}
            </p>

            <div style={{
              marginTop: "1.5rem",
              borderRadius: 16,
              border: "1px solid rgba(6,182,212,0.2)",
              background: "rgba(6,182,212,0.06)",
              padding: "1.25rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <TrendingUp size={18} color="var(--secondary)" />
                <h3 style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>AI Recommendation</h3>
              </div>
              <p style={{ color: "var(--text-2)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Continue monitoring customer feedback while prioritizing delivery quality
                and reducing response time for open support tickets.
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Positive Sentiment", value: positiveRate, raw: positive, color: "var(--positive)" },
              { label: "Neutral Sentiment",  value: neutralRate,  raw: neutral,  color: "var(--warning)" },
              { label: "Negative Sentiment", value: negativeRate, raw: negative, color: "var(--negative)" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-2)" }}>{m.label}</span>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <span style={{ fontSize: "0.825rem", color: "var(--text-3)" }}>{m.raw} reviews</span>
                    <span style={{ fontWeight: 700, color: m.color, fontSize: "0.875rem" }}>{m.value}%</span>
                  </div>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "var(--surface-3)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    style={{ height: "100%", borderRadius: 99, background: m.color }}
                  />
                </div>
              </motion.div>
            ))}

            <div style={{
              marginTop: "0.5rem",
              borderRadius: 16,
              border: "1px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.06)",
              padding: "1.25rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <AlertTriangle size={18} color="var(--negative)" />
                <h3 style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>Priority Focus</h3>
              </div>
              <p style={{ color: "var(--text-2)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Reduce delivery delays and improve product packaging to minimize complaints.
              </p>
            </div>
          </div>

        </div>
      </GlowCard>
    </motion.div>
  );
}
