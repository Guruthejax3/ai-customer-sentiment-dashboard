"use client";

import { useState } from "react";
import { Search, Database, TrendingUp, Download } from "lucide-react";
import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";
import { ReviewRecord } from "@/types/sentiment";

interface Props {
  data: ReviewRecord[];
}

const sentimentStyle = {
  POSITIVE: { bg: "rgba(16,185,129,0.1)", color: "#10b981", border: "rgba(16,185,129,0.25)" },
  NEGATIVE: { bg: "rgba(239,68,68,0.1)",  color: "#ef4444", border: "rgba(239,68,68,0.25)" },
  NEUTRAL:  { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
};

export default function DatabaseTable({ data }: Props) {
  const [search, setSearch] = useState("");

  const filtered = data.filter(
    (r) =>
      r.review.toLowerCase().includes(search.toLowerCase()) ||
      r.sentiment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle
        icon={<Database size={18} />}
        title="Review Database"
        subtitle="Real-time sentiment records"
        label="Data"
      />

      <GlowCard className="p-7" hover={false}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div style={{
            flex: 1, minWidth: 200,
            display: "flex", alignItems: "center", gap: "0.6rem",
            padding: "0.65rem 1rem",
            borderRadius: 12,
            border: "1px solid var(--border-2)",
            background: "var(--surface-2)",
          }}>
            <Search size={16} style={{ color: "var(--text-3)", flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reviews or sentiment…"
              style={{
                background: "transparent", border: "none", outline: "none",
                color: "var(--text)", fontSize: "0.875rem", width: "100%",
                padding: 0, borderRadius: 0,
              }}
            />
          </div>

          <div style={{
            padding: "0.55rem 1rem",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface-2)",
            fontSize: "0.8rem",
            color: "var(--text-3)",
            whiteSpace: "nowrap",
          }}>
            {filtered.length} records
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "45%" }}>Review</th>
                <th>Sentiment</th>
                <th>Confidence</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "3rem", color: "var(--text-3)" }}>
                    {data.length === 0
                      ? "No reviews yet — analyze some feedback above."
                      : "No results match your search."}
                  </td>
                </tr>
              ) : (
                filtered.map((review, i) => {
                  const s = sentimentStyle[review.sentiment];
                  return (
                    <motion.tr
                      key={review.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <td style={{ maxWidth: 360, paddingRight: "1.5rem" }}>
                        <p style={{
                          color: "var(--text-2)",
                          fontSize: "0.875rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.55,
                        }}>
                          {review.review}
                        </p>
                      </td>
                      <td>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: "0.35rem",
                          padding: "0.3rem 0.75rem", borderRadius: 999,
                          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                          fontSize: "0.775rem", fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, boxShadow: `0 0 5px ${s.color}` }} />
                          {review.sentiment}
                        </span>
                      </td>
                      <td>
                        <div style={{ width: 110 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                            <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--text)" }}>
                              {review.confidence}%
                            </span>
                          </div>
                          <div style={{ height: 6, borderRadius: 99, background: "var(--surface-3)", overflow: "hidden" }}>
                            <div
                              style={{
                                height: "100%", borderRadius: 99,
                                width: `${review.confidence}%`,
                                background: "linear-gradient(90deg, var(--secondary), var(--primary))",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.825rem", color: "var(--text-3)" }}>{review.timestamp}</span>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </motion.div>
  );
}
