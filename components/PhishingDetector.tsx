
import React, { useState } from 'react';
import { analyzePhishing } from '../services/geminiService';
import { AnalysisResult } from '../types';

const PhishingDetector: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const data = await analyzePhishing(content);
      setResult(data);
    } catch (error) {
      alert("Analysis failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return 'text-red-500 border-red-500 bg-red-500/10';
      case 'high': return 'text-orange-500 border-orange-500 bg-orange-500/10';
      case 'medium': return 'text-yellow-500 border-yellow-500 bg-yellow-500/10';
      default: return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email & Link Scanner
        </h2>
        <p className="text-slate-400 text-sm mb-4">Paste the full email content, headers, or a suspicious URL below for AI-powered analysis.</p>
        
        <textarea
          className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm mono focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-600"
          placeholder="Paste email body or suspicious URL here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        
        <button
          onClick={handleAnalyze}
          disabled={loading || !content.trim()}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded-lg font-semibold transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : 'Scan for Threats'}
        </button>
      </div>

      {result && (
        <div className={`p-6 rounded-xl border animate-in fade-in duration-500 ${getRiskColor(result.riskLevel)}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel} Risk
              </span>
              <h3 className="text-xl font-bold mt-2 text-white">{result.summary}</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-2 underline decoration-emerald-500/50">Identified Indicators</h4>
              <ul className="space-y-2">
                {result.details.map((detail, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="mr-2 text-emerald-400">•</span>
                    <span className="text-slate-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-2 underline decoration-emerald-500/50">Recommended Actions</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <span className="mr-2 text-emerald-400">✓</span>
                    <span className="text-slate-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishingDetector;
