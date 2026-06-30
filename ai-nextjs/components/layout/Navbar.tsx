"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Clock3, Menu, X } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid var(--border)",
      background: scrolled ? "var(--glass-bg)" : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 46, height: 46,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
              flexShrink: 0,
            }}
          >
            <BrainCircuit size={24} color="white" />
          </motion.div>
          <div>
            <h1 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
              SentimentIQ
            </h1>
            <p style={{ fontSize: "0.72rem", color: "var(--text-3)", fontWeight: 500, letterSpacing: "0.04em" }}>
              ENTERPRISE AI ANALYTICS
            </p>
          </div>
        </div>

        {/* Desktop Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden lg:flex">
          <StatusBadge text="Backend Online" color="green" pulse />
          <StatusBadge text="PostgreSQL" color="blue" />
          <StatusBadge text="DistilBERT" color="purple" />

          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.45rem 0.9rem",
            borderRadius: 12,
            border: "1px solid var(--border-2)",
            background: "var(--surface-2)",
            color: "var(--secondary)",
            fontSize: "0.825rem",
            fontWeight: 600,
          }}>
            <Clock3 size={15} />
            <span style={{ color: "var(--text-2)" }}>{time}</span>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="flex lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{
              width: 40, height: 40, borderRadius: 12,
              border: "1px solid var(--border-2)",
              background: "var(--surface-2)",
              color: "var(--text-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--glass-bg)",
            backdropFilter: "blur(24px)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <StatusBadge text="Backend Online" color="green" pulse />
          <StatusBadge text="PostgreSQL" color="blue" />
          <StatusBadge text="DistilBERT" color="purple" />
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.35rem 0.75rem",
            borderRadius: 10,
            border: "1px solid var(--border-2)",
            background: "var(--surface-2)",
            fontSize: "0.8rem", fontWeight: 600, color: "var(--text-2)",
          }}>
            <Clock3 size={14} color="var(--secondary)" />
            {time}
          </div>
        </motion.div>
      )}
    </header>
  );
}
