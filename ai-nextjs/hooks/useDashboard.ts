"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { analyzeText, checkHealth, extractReviewText } from "@/services/api";
import { AnalysisResponse } from "@/types/sentiment";
import {
  ActivityItem,
  DashboardStats,
  PipelineStep,
  ReviewRecord,
} from "@/types/dashboard";

const INITIAL_STATS: DashboardStats = {
  total: 0,
  positive: 0,
  neutral: 0,
  negative: 0,
};

const INITIAL_PIPELINE: PipelineStep[] = [
  {
    id: "upload",
    label: "Data Ingestion",
    description: "CSV parsed and validated",
    status: "pending",
  },
  {
    id: "analyze",
    label: "AI Classification",
    description: "DistilBERT sentiment scoring",
    status: "pending",
  },
  {
    id: "store",
    label: "Record Storage",
    description: "Results saved to dashboard",
    status: "pending",
  },
  {
    id: "insights",
    label: "Insight Generation",
    description: "Executive summary updated",
    status: "pending",
  },
];

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function bumpStats(
  prev: DashboardStats,
  sentiment: AnalysisResponse["sentiment"]
): DashboardStats {
  return {
    total: prev.total + 1,
    positive: prev.positive + (sentiment === "POSITIVE" ? 1 : 0),
    neutral: prev.neutral + (sentiment === "NEUTRAL" ? 1 : 0),
    negative: prev.negative + (sentiment === "NEGATIVE" ? 1 : 0),
  };
}

export function useDashboard() {
  const [csvRows, setCsvRows] = useState<Record<string, unknown>[]>([]);
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [pipeline, setPipeline] = useState<PipelineStep[]>(INITIAL_PIPELINE);
  const [backendOnline, setBackendOnline] = useState(false);
  const [batchProgress, setBatchProgress] = useState<number | null>(null);

  const addActivity = useCallback(
    (icon: ActivityItem["icon"], title: string) => {
      const item: ActivityItem = {
        id: `${Date.now()}-${Math.random()}`,
        icon,
        title,
        time: formatTime(),
      };
      setActivities((prev) => [item, ...prev].slice(0, 8));
    },
    []
  );

  const updatePipeline = useCallback(
    (id: string, status: PipelineStep["status"]) => {
      setPipeline((prev) =>
        prev.map((step) => (step.id === id ? { ...step, status } : step))
      );
    },
    []
  );

  const resetPipeline = useCallback(() => {
    setPipeline(INITIAL_PIPELINE);
  }, []);

  useEffect(() => {
    checkHealth().then(setBackendOnline);
    const interval = setInterval(async () => {
      setBackendOnline(await checkHealth());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalysisComplete = useCallback(
    (review: string, result: AnalysisResponse) => {
      const record: ReviewRecord = {
        id: Date.now().toString(),
        review,
        sentiment: result.sentiment,
        confidence: Number((result.confidence * 100).toFixed(1)),
        timestamp: formatTime(),
      };

      setReviews((prev) => [record, ...prev]);
      setStats((prev) => bumpStats(prev, result.sentiment));
      addActivity("brain", `Analyzed: ${result.sentiment.toLowerCase()} sentiment`);
      updatePipeline("analyze", "complete");
      updatePipeline("store", "complete");
      updatePipeline("insights", "complete");
    },
    [addActivity, updatePipeline]
  );

  const handleCSVUpload = useCallback(
    (rows: Record<string, unknown>[]) => {
      setCsvRows(rows);
      resetPipeline();
      updatePipeline("upload", "complete");
      addActivity("upload", `CSV uploaded — ${rows.length} rows`);
      toast.success(`${rows.length} records loaded`);
    },
    [addActivity, resetPipeline, updatePipeline]
  );

  const analyzeBatch = useCallback(async () => {
    if (csvRows.length === 0) {
      toast.error("Upload a CSV first");
      return;
    }

    if (!backendOnline) {
      toast.error("Backend is offline");
      return;
    }

    const texts = csvRows
      .map(extractReviewText)
      .filter((t): t is string => Boolean(t));

    if (texts.length === 0) {
      toast.error("No review text found in CSV columns");
      return;
    }

    resetPipeline();
    updatePipeline("upload", "complete");
    updatePipeline("analyze", "active");
    setBatchProgress(0);

    let processed = 0;

    for (const text of texts) {
      try {
        const result = await analyzeText(text);
        handleAnalysisComplete(text, result);
        processed += 1;
        setBatchProgress(Math.round((processed / texts.length) * 100));
      } catch {
        updatePipeline("analyze", "error");
        toast.error("Batch analysis failed — check backend");
        setBatchProgress(null);
        return;
      }
    }

    setBatchProgress(null);
    addActivity("check", `Batch complete — ${processed} reviews analyzed`);
    toast.success(`Analyzed ${processed} reviews`);
  }, [
    addActivity,
    backendOnline,
    csvRows,
    handleAnalysisComplete,
    resetPipeline,
    updatePipeline,
  ]);

  return {
    csvRows,
    reviews,
    stats,
    activities,
    pipeline,
    backendOnline,
    batchProgress,
    handleCSVUpload,
    handleAnalysisComplete,
    analyzeBatch,
  };
}
