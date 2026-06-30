"use client";

import { motion } from "framer-motion";
import { Upload, Brain, Database, CheckCircle2, Clock } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";

const activities = [
  { icon: Upload,       title: "CSV Dataset Uploaded",        subtitle: "1,240 rows parsed successfully",       time: "2m ago",   color: "var(--secondary)" },
  { icon: Brain,        title: "AI Analysis Completed",       subtitle: "DistilBERT processed all records",     time: "2m ago",   color: "var(--primary)" },
  { icon: Database,     title: "Saved to Database",           subtitle: "PostgreSQL records committed",         time: "1m ago",   color: "var(--violet)" },
  { icon: CheckCircle2, title: "Executive Summary Generated", subtitle: "AI insights report is ready",          time: "Just now", color: "var(--positive)" },
];

export default function ActivityFeed() {
  return (
    <GlowCard className="p-7 h-full">
      <SectionTitle title="Recent Activity" subtitle="Live pipeline events" />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {activities.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: "0.875rem",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--surface-2)",
                cursor: "default",
                transition: "border-color 0.2s, background 0.2s",
              }}
              whileHover={{ borderColor: "var(--border-2)" }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `${a.color}18`,
                border: `1px solid ${a.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={18} style={{ color: a.color }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: "0.775rem", color: "var(--text-3)", marginTop: "0.15rem" }}>
                  {a.subtitle}
                </p>
              </div>

              <div style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                fontSize: "0.75rem", color: "var(--text-3)", flexShrink: 0,
              }}>
                <Clock size={12} />
                {a.time}
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlowCard>
  );
}
