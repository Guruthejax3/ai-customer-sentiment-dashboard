"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { motion } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";
import { BarChart2 } from "lucide-react";

interface Props {
  positive: number;
  neutral: number;
  negative: number;
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-2)",
      borderRadius: 14,
      padding: "0.75rem 1rem",
      boxShadow: "var(--card-shadow)",
    }}>
      <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.25rem" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill || p.color, fontSize: "0.875rem" }}>
          {p.name || "Count"}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Charts({ positive, neutral, negative }: Props) {
  const total = positive + neutral + negative;

  const pieData = [
    { name: "Positive", value: positive || 0 },
    { name: "Neutral",  value: neutral  || 0 },
    { name: "Negative", value: negative || 0 },
  ];

  const barData = pieData.map(d => ({
    ...d,
    pct: total > 0 ? +((d.value / total) * 100).toFixed(1) : 0,
  }));

  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <SectionTitle
        icon={<BarChart2 size={18} />}
        title="Sentiment Analytics"
        subtitle="Distribution and comparison breakdown"
        label="Visualizations"
      />

      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>

        {/* Pie */}
        <GlowCard className="p-6">
          <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>Distribution</h3>
          <p style={{ fontSize: "0.825rem", color: "var(--text-3)", marginBottom: "1.25rem" }}>Sentiment share by category</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={105}
                innerRadius={50}
                paddingAngle={3}
                labelLine={false}
                label={renderLabel}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {pieData.map((d, i) => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i] }} />
                <span style={{ fontSize: "0.8rem", color: "var(--text-2)" }}>{d.name}</span>
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Bar */}
        <GlowCard className="p-6">
          <h3 style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>Comparison</h3>
          <p style={{ fontSize: "0.825rem", color: "var(--text-3)", marginBottom: "1.25rem" }}>Review counts per sentiment</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--text-3)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-3)", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} name="Count">
                {barData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlowCard>

      </div>
    </motion.div>
  );
}
