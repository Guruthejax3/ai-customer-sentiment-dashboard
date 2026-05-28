"use client";

import React, { useState } from "react";
import { 
  BarChart3, Database, Zap, Cpu, Terminal, Workflow, 
  Smile, Meh, Frown, Activity, RefreshCw 
} from "lucide-react";

interface DatabaseRecord {
  id: string;
  text: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  confidence: number;
  timestamp: string;
}

const INITIAL_RECORDS: DatabaseRecord[] = [
  { id: "TX-9082", text: "Customer support resolved my complex query in under ten minutes. Outstanding speed!", sentiment: "Positive", confidence: 0.98, timestamp: "10m ago" },
  { id: "TX-9081", text: "The basic platform navigation is solid, but the setup UI is missing clear guidelines.", sentiment: "Neutral", confidence: 0.81, timestamp: "24m ago" },
  { id: "TX-9080", text: "System crashes with an unhandled exception code every time I render massive JSON sets.", sentiment: "Negative", confidence: 0.96, timestamp: "45m ago" },
  { id: "TX-9079", text: "Extremely clean design. Highly recommend this team over alternative services.", sentiment: "Positive", confidence: 0.94, timestamp: "1h ago" },
  { id: "TX-9078", text: "It is operational. Not great, but meets standard needs.", sentiment: "Neutral", confidence: 0.72, timestamp: "2h ago" },
  { id: "TX-9077", text: "Terrible configuration guides. I ended up completely lost during initial load.", sentiment: "Negative", confidence: 0.97, timestamp: "3h ago" }
];

export default function DashboardPage() {
  const [database, setDatabase] = useState<DatabaseRecord[]>(INITIAL_RECORDS);
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Pipeline Progress States
  const [activeStep, setActiveStep] = useState<number>(0);
  const [tokens, setTokens] = useState<string[]>([]);
  const [embeddings, setEmbeddings] = useState<number[]>([]);
  const [probabilities, setProbabilities] = useState({ positive: 0, neutral: 0, negative: 0 });

  // Compute live KPIs based on state changes
  const totalCount = database.length;
  const positivePct = totalCount ? Math.round((database.filter(r => r.sentiment === "Positive").length / totalCount) * 100) : 0;
  const neutralPct = totalCount ? Math.round((database.filter(r => r.sentiment === "Neutral").length / totalCount) * 100) : 0;
  const negativePct = totalCount ? Math.round((database.filter(r => r.sentiment === "Negative").length / totalCount) * 100) : 0;

  // Run Simulated BERT NLP Pipeline
  const runInferencePipeline = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setActiveStep(1);
    setTokens([]);
    setEmbeddings([]);
    setProbabilities({ positive: 0, neutral: 0, negative: 0 });

    // Step 1: Cleaning & Tokenization simulation
    await new Promise(r => setTimeout(r, 850));
    const cleanedWords = inputText.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0);
    setTokens(cleanedWords);
    
    // Step 2: High-dimensional BERT Embeddings Mapping simulation
    await new Promise(r => setTimeout(r, 850));
    setActiveStep(2);
    const mockEmbeds = Array.from({ length: 6 }, () => parseFloat((Math.random() * (0.8 - (-0.8)) + (-0.8)).toFixed(4)));
    setEmbeddings(mockEmbeds);

    // Step 3: Softmax Class Logits Distribution simulation
    await new Promise(r => setTimeout(r, 850));
    setActiveStep(3);

    const positiveKeywords = ["good", "great", "awesome", "amazing", "perfect", "love", "happy", "fast", "recommend", "excellent", "helpful", "clean", "functional", "nice"];
    const negativeKeywords = ["bad", "terrible", "worst", "broken", "slow", "fail", "poor", "hate", "annoyed", "useless", "bug", "crash", "lost", "missing", "difficult"];

    let posCount = 0;
    let negCount = 0;
    cleanedWords.forEach(w => {
      if (positiveKeywords.includes(w)) posCount++;
      if (negativeKeywords.includes(w)) negCount++;
    });

    let sResult: "Positive" | "Neutral" | "Negative" = "Neutral";
    let pVal = 0.33, nVal = 0.34, negVal = 0.33;

    if (posCount > negCount) {
      sResult = "Positive";
      pVal = 0.82 + (Math.random() * 0.14);
      negVal = Math.random() * 0.05;
      nVal = 1.0 - pVal - negVal;
    } else if (negCount > posCount) {
      sResult = "Negative";
      negVal = 0.82 + (Math.random() * 0.14);
      pVal = Math.random() * 0.05;
      nVal = 1.0 - negVal - pVal;
    } else {
      sResult = "Neutral";
      nVal = 0.70 + (Math.random() * 0.20);
      pVal = Math.random() * 0.12;
      negVal = 1.0 - nVal - pVal;
    }

    setProbabilities({
      positive: Math.round(pVal * 100),
      neutral: Math.round(nVal * 100),
      negative: Math.round(negVal * 100)
    });

    // Save and commit item to the Database state
    const transactionId = "TX-" + Math.floor(9083 + Math.random() * 5000);
    const highConfidenceValue = Math.max(pVal, nVal, negVal);

    setDatabase(prev => [
      {
        id: transactionId,
        text: inputText,
        sentiment: sResult,
        confidence: parseFloat(highConfidenceValue.toFixed(2)),
        timestamp: "Just now"
      },
      ...prev
    ]);

    setIsAnalyzing(false);
    setInputText("");
  };

  return (
    <div className="flex-grow flex flex-col">
      {/* Top Header Navbar */}
      <header className="bg-[#0d1527] border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                BERT Sentiment Dashboard
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-semibold tracking-normal">v1.2-beta</span>
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Inference Node Status: <span className="text-slate-300 font-medium">Online (PyTorch Backend)</span>
              </p>
            </div>
          </div>

          {/* System Environment Logs */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="bg-[#121c33] text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800/80 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>DB Sync: <strong className="text-emerald-400">Postgres Connected</strong></span>
            </div>
            <div className="bg-[#121c33] text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800/80 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>API Latency: <strong className="text-white">32ms</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column - NLP pipeline sandbox (5 Cols) */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Sandbox Panel */}
          <div className="glass-panel p-6 rounded-2xl glow-indigo flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-indigo-400" /> Real-Time NLP Sandbox
              </h2>
              <span className="text-[11px] bg-indigo-500/10 text-indigo-400 font-semibold px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Playground
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Customer Feedback Text
              </label>
              <textarea 
                id="feedback" 
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type customer review here (e.g., 'Amazing support team, resolved my problem in minutes!')"
                className="w-full bg-[#0a0f1d] text-sm text-slate-200 p-3 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all resize-none placeholder-slate-600"
              />
            </div>

            <button 
              onClick={runInferencePipeline}
              disabled={isAnalyzing || !inputText.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 text-sm"
            >
              <Cpu className="w-4 h-4" />
              <span>{isAnalyzing ? "Processing Tokens..." : "Run BERT Inference"}</span>
            </button>
          </div>

          {/* NLP Preprocessing Flow Panel */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 flex-grow">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                <Workflow className="w-4 h-4 text-slate-400" /> BERT Pipeline Trace
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-xs">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start relative pb-2">
                <div className="w-0.5 bg-slate-800 absolute left-3 top-6 bottom-0"></div>
                <div className={`w-6.5 h-6.5 min-w-6 min-h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  activeStep >= 1 ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-500"
                }`}>1</div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-slate-200">Cleaning & Tokenization</h4>
                  <p className="text-slate-400 mt-0.5 text-[11px]">Normalizes formatting, strips punctuations, and extracts subword tokens.</p>
                  
                  {tokens.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tokens.map((token, i) => (
                        <span key={i} className="bg-[#1e293b] border border-slate-700 text-indigo-300 font-mono text-[10px] px-1.5 py-0.5 rounded">
                          [{token}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start relative pb-2">
                <div className="w-0.5 bg-slate-800 absolute left-3 top-6 bottom-0"></div>
                <div className={`w-6.5 h-6.5 min-w-6 min-h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  activeStep >= 2 ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-500"
                }`}>2</div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-slate-200">Subword Positional Embeddings</h4>
                  <p className="text-slate-400 mt-0.5 text-[11px]">Maps structural token weights into highly descriptive float vector embeddings.</p>
                  
                  {embeddings.length > 0 && (
                    <p className="text-[10px] font-mono bg-[#090d16] text-emerald-400 p-2 rounded border border-slate-800/80 mt-2 overflow-x-auto whitespace-nowrap">
                      Dim [1, 768]: [{embeddings.join(", ")}, ...]
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className={`w-6.5 h-6.5 min-w-6 min-h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  activeStep >= 3 ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-500"
                }`}>3</div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-slate-200">Classification Head Softmax</h4>
                  <p className="text-slate-400 mt-0.5 text-[11px]">Decodes attention-weighted structures into probability percentages.</p>
                  
                  {activeStep >= 3 && (
                    <div className="space-y-2 mt-3 p-3 bg-[#0a0f1d] border border-slate-800 rounded-xl">
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-0.5">
                          <span className="flex items-center gap-1"><Smile className="w-3.5 h-3.5 text-emerald-500" /> Positive</span>
                          <span className="font-bold text-emerald-400">{probabilities.positive}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${probabilities.positive}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-0.5">
                          <span className="flex items-center gap-1"><Meh className="w-3.5 h-3.5 text-amber-500" /> Neutral</span>
                          <span className="font-bold text-amber-400">{probabilities.neutral}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${probabilities.neutral}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-0.5">
                          <span className="flex items-center gap-1"><Frown className="w-3.5 h-3.5 text-rose-500" /> Negative</span>
                          <span className="font-bold text-rose-400">{probabilities.negative}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${probabilities.negative}%` }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Right column - Data analytics and dynamic database rows (7 Cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Top KPI Metrics Card Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
              <div className="text-slate-400 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Analyzed</span>
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white">{totalCount}</div>
              <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded w-fit font-mono">Live SQL Database</span>
            </div>

            {/* KPI 2 */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
              <div className="text-slate-400 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Positive %</span>
                <Smile className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">{positivePct}%</div>
              <span className="text-[9px] text-slate-400">Favorable reviews</span>
            </div>

            {/* KPI 3 */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
              <div className="text-slate-400 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Neutral %</span>
                <Meh className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">{neutralPct}%</div>
              <span className="text-[9px] text-slate-400">Mixed signals</span>
            </div>

            {/* KPI 4 */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-1.5 hover:border-slate-700 transition-colors">
              <div className="text-slate-400 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Negative %</span>
                <Frown className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400">{negativePct}%</div>
              <span className="text-[9px] text-slate-400">Needs intervention</span>
            </div>
          </div>

          {/* Custom SVG Analytics Plots */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Custom SVG Trend Plot */}
            <div className="glass-panel p-5 rounded-2xl md:col-span-7 flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-widest text-slate-300">Sentiment Distribution Chart</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Custom visual breakdown of all transaction data</p>
              </div>
              
              <div className="h-44 w-full flex items-end justify-between px-2 pt-6 relative border-b border-l border-slate-800">
                {/* Horizontal Guide Lines */}
                <div className="absolute left-0 right-0 top-1/4 border-t border-slate-800/40 pointer-events-none"></div>
                <div className="absolute left-0 right-0 top-2/4 border-t border-slate-800/40 pointer-events-none"></div>
                <div className="absolute left-0 right-0 top-3/4 border-t border-slate-800/40 pointer-events-none"></div>

                {/* Positive Pillar */}
                <div className="flex flex-col items-center gap-2 w-1/3 z-10 group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-400 transition-colors">{positivePct}%</span>
                  <div 
                    className="w-12 bg-emerald-500/80 hover:bg-emerald-500 rounded-t-md transition-all duration-500 shadow-lg shadow-emerald-500/10"
                    style={{ height: `${Math.max(8, positivePct * 1.2)}px` }}
                  ></div>
                  <span className="text-[10px] text-slate-400">Positive</span>
                </div>

                {/* Neutral Pillar */}
                <div className="flex flex-col items-center gap-2 w-1/3 z-10 group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-amber-400 transition-colors">{neutralPct}%</span>
                  <div 
                    className="w-12 bg-amber-500/80 hover:bg-amber-500 rounded-t-md transition-all duration-500 shadow-lg shadow-amber-500/10"
                    style={{ height: `${Math.max(8, neutralPct * 1.2)}px` }}
                  ></div>
                  <span className="text-[10px] text-slate-400">Neutral</span>
                </div>

                {/* Negative Pillar */}
                <div className="flex flex-col items-center gap-2 w-1/3 z-10 group">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-rose-400 transition-colors">{negativePct}%</span>
                  <div 
                    className="w-12 bg-rose-500/80 hover:bg-rose-500 rounded-t-md transition-all duration-500 shadow-lg shadow-rose-500/10"
                    style={{ height: `${Math.max(8, negativePct * 1.2)}px` }}
                  ></div>
                  <span className="text-[10px] text-slate-400">Negative</span>
                </div>
              </div>
            </div>

            {/* Dynamic Interactive Gauge */}
            <div className="glass-panel p-5 rounded-2xl md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-widest text-slate-300">System Ratio</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Ratio of non-neutral items</p>
              </div>

              {/* Pure SVG donut representation of system ratios */}
              <div className="flex items-center justify-center py-4 relative">
                <svg width="120" height="120" viewBox="0 0 36 36" className="transform -rotate-90">
                  {/* Track ring background */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e293b" strokeWidth="3"></circle>
                  
                  {/* Favorable ring fraction segment */}
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="15.915" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="3.2" 
                    strokeDasharray={`${positivePct} ${100 - positivePct}`} 
                    strokeDashoffset="0"
                    className="transition-all duration-500"
                  ></circle>
                </svg>
                {/* Visual Label overlay inside donut */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-white">{positivePct}%</span>
                  <span className="text-[8px] uppercase tracking-wider text-slate-400">Favorable</span>
                </div>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-3">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Positive ({positivePct}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700"></span> Other ({100 - positivePct}%)</span>
              </div>
            </div>
          </div>

          {/* SQL Mirrored Logs Table */}
          <div className="glass-panel rounded-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1628]">
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-widest">Real-time DB Mirror</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Sync state mirror with active system logs</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Mirrored Feed</span>
              </div>
            </div>
            <div className="overflow-x-auto custom-scrollbar max-h-64">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#0b101c] text-slate-400 sticky top-0 border-b border-slate-800 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Customer Review</th>
                    <th className="p-4 text-center">BERT Classification</th>
                    <th className="p-4 text-right pr-6">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {database.map((record) => {
                    let badgeClass = "";
                    if (record.sentiment === "Positive") {
                      badgeClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                    } else if (record.sentiment === "Neutral") {
                      badgeClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                    } else {
                      badgeClass = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
                    }

                    return (
                      <tr key={record.id} className="hover:bg-[#0e1526]/40 transition-colors group">
                        <td className="p-4 pl-6 font-mono text-[11px] text-indigo-400 font-semibold">{record.id}</td>
                        <td className="p-4 max-w-xs truncate md:max-w-md text-slate-300 group-hover:text-white transition-colors" title={record.text}>
                          {record.text}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${badgeClass}`}>
                            {record.sentiment}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6 font-mono font-semibold text-white">
                          {(record.confidence * 100).toFixed(0)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>

      {/* Page Footer */}
      <footer className="bg-[#060a13] text-slate-500 border-t border-slate-900 py-6 mt-12 text-center text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Sentiment API System — Interactive College Project Build.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">PyTorch Docs</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Postgres Sandbox</span>
          </div>
        </div>
      </footer>
    </div>
  );
}