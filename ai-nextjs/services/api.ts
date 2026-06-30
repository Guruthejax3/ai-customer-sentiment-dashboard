import { AnalysisResponse } from "@/types/sentiment";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function analyzeText(text: string): Promise<AnalysisResponse> {
  const response = await fetch(`${API}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API}/health`, {
      signal: AbortSignal.timeout(4000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

const REVIEW_KEYS = [
  "review",
  "text",
  "feedback",
  "comment",
  "message",
  "content",
  "body",
  "description",
];

export function extractReviewText(row: Record<string, unknown>): string | null {
  for (const key of REVIEW_KEYS) {
    const match = Object.keys(row).find(
      (k) => k.toLowerCase() === key
    );
    if (match && row[match]) {
      return String(row[match]).trim();
    }
  }

  const firstString = Object.values(row).find(
    (v) => typeof v === "string" && v.trim().length > 10
  );

  return firstString ? String(firstString).trim() : null;
}
