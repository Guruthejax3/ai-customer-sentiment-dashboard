"use client";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export default function AnimatedButton({
  children,
  loading = false,
  onClick,
  className = "",
  variant = "primary",
}: Props) {
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <motion.button
      type="button"
      disabled={loading}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`${base} w-full ${className}`}
      style={{ opacity: loading ? 0.7 : 1 }}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" style={{ animation: "spin 1s linear infinite" }} />
          Processing…
        </>
      ) : children}
    </motion.button>
  );
}
