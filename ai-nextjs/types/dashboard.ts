import { AnalysisResponse, ReviewRecord } from "./sentiment";

export interface DashboardStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

export interface ActivityItem {
  id: string;
  icon: "upload" | "brain" | "database" | "check" | "alert";
  title: string;
  time: string;
}

export interface PipelineStep {
  id: string;
  label: string;
  description: string;
  status: "pending" | "active" | "complete" | "error";
}

export type OnAnalysisComplete = (
  review: string,
  result: AnalysisResponse
) => void;

export type { ReviewRecord };
