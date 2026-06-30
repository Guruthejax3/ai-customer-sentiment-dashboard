"use client";

import { useState, useRef } from "react";
import Papa from "papaparse";
import { UploadCloud, FileSpreadsheet, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "../ui/GlowCard";
import SectionTitle from "../ui/SectionTitle";

interface Props {
  onFileLoaded: (rows: any[]) => void;
}

export default function UploadCard({ onFileLoaded }: Props) {
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function processFile(file: File) {
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
        setRows(data.length);
        onFileLoaded(data);
      },
    });
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.name.endsWith(".csv")) processFile(file);
  }

  return (
    <GlowCard className="p-7 h-full" glowColor="cyan">
      <SectionTitle
        icon={<UploadCloud size={18} />}
        title="Upload Dataset"
        subtitle="CSV reviews · surveys · support tickets"
      />

      <motion.div
        animate={{ borderColor: dragging ? "var(--secondary)" : "var(--border-2)" }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed var(--border-2)`,
          borderRadius: 18,
          padding: "2.5rem 2rem",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(6,182,212,0.06)" : "var(--surface-2)",
          transition: "all 0.25s ease",
        }}
      >
        <motion.div
          animate={{ y: dragging ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: "0 auto 1.25rem",
            background: "rgba(6,182,212,0.1)",
            border: "1px solid rgba(6,182,212,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <UploadCloud size={30} color="var(--secondary)" />
          </div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
            {dragging ? "Release to upload" : "Drag & Drop CSV"}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-3)" }}>
            or <span style={{ color: "var(--secondary)", fontWeight: 600 }}>click to browse</span>
          </p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.775rem", color: "var(--text-3)" }}>
            Accepts .csv · up to 50MB
          </p>
        </motion.div>
        <input ref={inputRef} hidden type="file" accept=".csv" onChange={handleUpload} />
      </motion.div>

      <AnimatePresence>
        {fileName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              marginTop: "1.25rem",
              borderRadius: 14,
              border: "1px solid rgba(16,185,129,0.25)",
              background: "rgba(16,185,129,0.08)",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(16,185,129,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <CheckCircle2 size={20} color="var(--positive)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{fileName}</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
                {rows.toLocaleString()} rows imported
              </p>
            </div>
            <button
              onClick={() => { setFileName(""); setRows(0); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: 4 }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  );
}
