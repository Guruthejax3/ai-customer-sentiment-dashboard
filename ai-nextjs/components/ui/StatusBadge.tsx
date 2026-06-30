"use client";

interface Props {
  text: string;
  color: "green" | "yellow" | "red" | "blue" | "purple";
  pulse?: boolean;
}

const colorMap = {
  green:  { bg: "rgba(16,185,129,0.1)",  text: "#10b981", border: "rgba(16,185,129,0.25)", dot: "#10b981" },
  yellow: { bg: "rgba(245,158,11,0.1)",  text: "#f59e0b", border: "rgba(245,158,11,0.25)", dot: "#f59e0b" },
  red:    { bg: "rgba(239,68,68,0.1)",   text: "#ef4444", border: "rgba(239,68,68,0.25)",  dot: "#ef4444" },
  blue:   { bg: "rgba(6,182,212,0.1)",   text: "#06b6d4", border: "rgba(6,182,212,0.25)", dot: "#06b6d4" },
  purple: { bg: "rgba(139,92,246,0.1)",  text: "#8b5cf6", border: "rgba(139,92,246,0.25)", dot: "#8b5cf6" },
};

export default function StatusBadge({ text, color, pulse = false }: Props) {
  const c = colorMap[color];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      padding: "0.3rem 0.8rem",
      borderRadius: 999,
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>
      <span style={{
        width: 6, height: 6,
        borderRadius: "50%",
        background: c.dot,
        boxShadow: `0 0 6px ${c.dot}`,
        animation: pulse ? "pulse 2s infinite" : undefined,
      }} />
      {text}
    </span>
  );
}
