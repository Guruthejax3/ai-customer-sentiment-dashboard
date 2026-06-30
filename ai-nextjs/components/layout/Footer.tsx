"use client";

import { BrainCircuit } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <BrainCircuit size={18} color="white" />
          </div>
          <div>
            <p style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.925rem" }}>
              SentimentIQ Enterprise
            </p>
            <p style={{ fontSize: "0.775rem", color: "var(--text-3)", marginTop: "0.1rem" }}>
              Powered by FastAPI · DistilBERT · Next.js 16
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontSize: "0.775rem", color: "var(--text-3)",
            padding: "0.3rem 0.75rem",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "var(--surface-2)",
          }}>
            v2.0 Premium
          </span>
          <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
            © {new Date().getFullYear()} SentimentIQ
          </p>
        </div>
      </div>
    </footer>
  );
}
