
import React, { useState, useEffect } from 'react';
import { getSecurityAdvice } from '../services/geminiService';

const BestPractices: React.FC = () => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const fetchAdvice = async (topic?: string) => {
    setLoading(true);
    try {
      const result = await getSecurityAdvice(topic);
      setAdvice(result);
    } catch (e) {
      setAdvice("Error loading advice. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Cyber Knowledge Base
        </h2>
        
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Ask about a security topic (e.g., VPNs, 2FA, encryption)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchAdvice(query)}
          />
          <button 
            onClick={() => fetchAdvice(query)}
            className="bg-slate-700 hover:bg-slate-600 px-4 rounded-lg text-sm font-semibold transition-colors"
          >
            Ask AI
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm animate-pulse">Consulting the cyber expert...</p>
          </div>
        ) : (
          <div className="prose prose-invert prose-emerald max-w-none">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap">
              {advice}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '2FA Advice', topic: 'Best 2FA methods' },
          { label: 'Wi-Fi Security', topic: 'Safe public wifi usage' },
          { label: 'Data Backups', topic: 'Robust data backup strategies' },
          { label: 'Privacy Tools', topic: 'Top privacy tools for browsers' },
        ].map((item, idx) => (
          <button 
            key={idx}
            onClick={() => { setQuery(item.topic); fetchAdvice(item.topic); }}
            className="p-3 bg-slate-800/30 border border-slate-700 rounded-lg text-xs font-semibold text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all text-center"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BestPractices;
