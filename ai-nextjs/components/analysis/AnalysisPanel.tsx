"use client";

import { useState } from "react";
import { BrainCircuit, Sparkles, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import AnimatedButton from "../ui/AnimatedButton";
import SectionTitle from "../ui/SectionTitle";
import { analyzeText } from "@/services/api";
import { AnalysisResponse } from "@/types/sentiment";

interface Props {
  onAnalysisComplete: (review: string, result: AnalysisResponse) => void;
}

const sentimentConfig = {
  POSITIVE: { color: "var(--positive)", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", label: "Positive", emoji: "😊" },
  NEGATIVE: { color: "var(--negative)", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)",   label: "Negative", emoji: "😞" },
  NEUTRAL:  { color: "var(--warning)",  bg: "rgba(245,158,11,0.08)",border: "rgba(245,158,11,0.2)",  label: "Neutral",  emoji: "😐" },
};

export default function AnalysisPanel({ onAnalysisComplete }: Props) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!review.trim()) return;
    try {
      setLoading(true);
      setError("");
      setResult(null);
      const response = await analyzeText(review);
      setResult(response);
      onAnalysisComplete(review, response);
    } catch {
      setError("Unable to reach backend. Ensure FastAPI is running on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  const cfg = result ? sentimentConfig[result.sentiment] : null;

  return (
    <GlowCard className="p-7 h-full">
      <SectionTitle
        icon={<BrainCircuit size={18} />}
        title="AI Sentiment Analysis"
        subtitle="Powered by Hugging Face DistilBERT"
      />

      <textarea
        placeholder="Paste customer feedback here…"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <AnimatedButton onClick={handleAnalyze} loading={loading}>
        <Zap size={16} />
        Analyze Feedback
      </AnimatedButton>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: "1rem",
              borderRadius: 14,
              border: "1px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.07)",
              padding: "0.875rem 1rem",
              display: "flex", alignItems: "flex-start", gap: "0.75rem",
            }}
          >
            <AlertTriangle size={18} color="var(--negative)" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: "0.875rem", color: "var(--negative)", lineHeight: 1.55 }}>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && cfg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{
              marginTop: "1.25rem",
              borderRadius: 16,
              border: `1px solid ${cfg.border}`,
              background: cfg.bg,
              padding: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.95rem" }}>Prediction Result</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <CheckCircle2 size={16} color="var(--positive)" />
                <Sparkles size={16} color="var(--secondary)" />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{cfg.emoji}</span>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.45rem 1rem",
                borderRadius: 999,
                background: cfg.color + "20",
                border: `1px solid ${cfg.color}40`,
                color: cfg.color,
                fontWeight: 700,
                fontSize: "0.925rem",
                letterSpacing: "0.03em",
              }}>
                {cfg.label}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>Confidence Score</span>
                <span style={{ fontWeight: 700, color: cfg.color, fontSize: "0.925rem" }}>
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ height: 10, borderRadius: 99, background: "var(--surface-3)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence * 100}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}aa)` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  );
}
