
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">CyberGuard <span className="text-emerald-400">Sentinel</span></h1>
            <p className="text-xs text-slate-400 font-medium">Enterprise Security Assistant</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <span className="flex items-center text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            SYSTEMS ACTIVE
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
