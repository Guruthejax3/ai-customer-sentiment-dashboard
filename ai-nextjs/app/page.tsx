"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { BarChart2, Cpu, Wifi } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/dashboard/Hero";
import KPICards from "@/components/dashboard/KPICards";
import Charts from "@/components/dashboard/Charts";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AIInsights from "@/components/dashboard/AIInsights";
import UploadCard from "@/components/upload/UploadCard";
import AnalysisPanel from "@/components/analysis/AnalysisPanel";
import ProcessingPipeline from "@/components/analysis/ProcessingPipeline";
import DatabaseTable from "@/components/database/DatabaseTable";
import { AnalysisResponse, ReviewRecord } from "@/types/sentiment";

export default function Home() {
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, positive: 0, neutral: 0, negative: 0 });

  function handleCSVUpload(rows: any[]) {
    setCsvRows(rows);
  }

  function handleAnalysisComplete(review: string, result: AnalysisResponse) {
    const newReview: ReviewRecord = {
      id: Date.now().toString(),
      review,
      sentiment: result.sentiment,
      confidence: Number((result.confidence * 100).toFixed(1)),
      timestamp: new Date().toLocaleTimeString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    setStats((prev) => ({
      total: prev.total + 1,
      positive: prev.positive + (result.sentiment === "POSITIVE" ? 1 : 0),
      neutral:  prev.neutral  + (result.sentiment === "NEUTRAL"  ? 1 : 0),
      negative: prev.negative + (result.sentiment === "NEGATIVE" ? 1 : 0),
    }));
  }

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <Navbar />

      <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Hero */}
          <Hero />

          {/* Upload + Analysis */}
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
            <UploadCard onFileLoaded={handleCSVUpload} />
            <AnalysisPanel onAnalysisComplete={handleAnalysisComplete} />
          </div>

          {/* KPIs */}
          <KPICards
            total={stats.total}
            positive={stats.positive}
            neutral={stats.neutral}
            negative={stats.negative}
          />

          {/* Charts */}
          <Charts
            positive={stats.positive}
            neutral={stats.neutral}
            negative={stats.negative}
          />

          {/* Executive Summary */}
          <ExecutiveSummary
            total={stats.total}
            positive={stats.positive}
            neutral={stats.neutral}
            negative={stats.negative}
          />

          {/* AI Insights + Activity */}
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
            <AIInsights />
            <ActivityFeed />
          </div>

          {/* Pipeline */}
          <ProcessingPipeline />

          {/* Database */}
          <DatabaseTable data={reviews} />

          {/* Footer stats strip */}
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {[
              {
                label: "Uploaded Dataset",
                value: csvRows.length,
                sub: "Records Loaded",
                icon: <BarChart2 size={20} />,
                color: "var(--secondary)",
              },
              {
                label: "AI Accuracy",
                value: null,
                display: "98.4%",
                sub: "DistilBERT Confidence",
                icon: <Cpu size={20} />,
                color: "var(--primary)",
                gradient: true,
              },
              {
                label: "Backend Status",
                value: null,
                display: "Online",
                sub: "FastAPI Connected",
                icon: <Wifi size={20} />,
                color: "var(--positive)",
                dot: true,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  padding: "1.5rem",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-3)", fontWeight: 500 }}>{item.label}</p>
                </div>

                {item.value !== null ? (
                  <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
                    <CountUp end={item.value} duration={2} separator="," />
                  </h2>
                ) : item.gradient ? (
                  <h2 className="gradient-text" style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {item.display}
                  </h2>
                ) : (
                  <h2 style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "2rem", fontWeight: 800, color: item.color, letterSpacing: "-0.02em" }}>
                    {item.dot && <span className="status-dot" />}
                    {item.display}
                  </h2>
                )}

                <p style={{ marginTop: "0.25rem", fontSize: "0.825rem", color: "var(--text-3)" }}>{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {reviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                borderRadius: 24,
                border: "2px dashed var(--border-2)",
                padding: "4rem 2rem",
                textAlign: "center",
                background: "var(--surface)",
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 20, margin: "0 auto 1.25rem",
                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0.7,
              }}>
                <BarChart2 size={30} color="white" />
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem" }}>
                No Reviews Analysed Yet
              </h2>
              <p style={{ color: "var(--text-3)", maxWidth: 440, margin: "0 auto", lineHeight: 1.75 }}>
                Upload a CSV dataset or paste a customer review above to populate the dashboard
                with real-time AI sentiment insights.
              </p>
            </motion.div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}
