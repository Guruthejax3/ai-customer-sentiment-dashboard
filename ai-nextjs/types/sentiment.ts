export interface AnalysisResponse {
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  confidence: number;
}

export interface ReviewRecord {
  id: string;
  review: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  confidence: number;
  timestamp: string;
}

export interface AnalyzeRequest {
  text: string;
}