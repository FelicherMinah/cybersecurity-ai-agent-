
import React, { useState, useEffect } from 'react';
import { PasswordAnalysis } from '../types';

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysis>({
    score: 0,
    suggestions: [],
    strength: 'Weak'
  });

  const checkPassword = (pwd: string) => {
    let score = 0;
    const suggestions: string[] = [];

    if (pwd.length === 0) {
      setAnalysis({ score: 0, suggestions: [], strength: 'Weak' });
      return;
    }

    if (pwd.length < 8) {
      suggestions.push("Make it at least 8 characters long (ideally 12+).");
    } else {
      score += 1;
    }

    if (/[A-Z]/.test(pwd)) score += 1;
    else suggestions.push("Add uppercase letters.");

    if (/[a-z]/.test(pwd)) score += 1;
    else suggestions.push("Add lowercase letters.");

    if (/[0-9]/.test(pwd)) score += 1;
    else suggestions.push("Include numbers.");

    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    else suggestions.push("Use special characters (e.g., !, @, #).");

    let strength: PasswordAnalysis['strength'] = 'Weak';
    if (score >= 5) strength = 'Strong';
    else if (score >= 4) strength = 'Good';
    else if (score >= 2) strength = 'Fair';

    setAnalysis({ score, suggestions, strength });
  };

  useEffect(() => {
    checkPassword(password);
  }, [password]);

  const getStrengthColor = () => {
    switch (analysis.strength) {
      case 'Strong': return 'bg-emerald-500';
      case 'Good': return 'bg-blue-500';
      case 'Fair': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Password Security Lab
      </h2>
      
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 pr-12 text-lg mono focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-600"
            placeholder="Type a password to test..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter text-white ${getStrengthColor()}`}>
                {analysis.strength}
             </span>
          </div>
        </div>

        {password && (
          <div className="animate-in slide-in-from-top duration-300">
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden mb-4">
              <div 
                className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                style={{ width: `${(analysis.score / 5) * 100}%` }}
              ></div>
            </div>

            {analysis.suggestions.length > 0 && (
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Improvement Tips</h4>
                <ul className="space-y-1">
                  {analysis.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full mr-2"></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {analysis.strength === 'Strong' && (
              <div className="flex items-center space-x-2 text-emerald-400 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Excellent. This password meets high security standards.</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 border border-dashed border-slate-700 rounded-lg">
        <p className="text-xs text-slate-500 italic">
          Tip: Instead of complex passwords, try a <span className="text-emerald-400 font-semibold">passphrase</span>: four or more random words like "CorrectHorseBatteryStaple". They are easier to remember and harder to crack.
        </p>
      </div>
    </div>
  );
};

export default PasswordChecker;
