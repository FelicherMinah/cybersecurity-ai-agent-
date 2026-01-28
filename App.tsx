
import React, { useState } from 'react';
import Header from './components/Header';
import PhishingDetector from './components/PhishingDetector';
import PasswordChecker from './components/PasswordChecker';
import BestPractices from './components/BestPractices';
import ThreatReporter from './components/ThreatReporter';
import { ViewState } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewState>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveTab} />;
      case 'phishing':
        return <PhishingDetector />;
      case 'password':
        return <PasswordChecker />;
      case 'practices':
        return <BestPractices />;
      case 'report':
        return <ThreatReporter />;
      default:
        return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar space-x-1 mb-8 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <TabButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
            label="Home" 
          />
          <TabButton 
            active={activeTab === 'phishing'} 
            onClick={() => setActiveTab('phishing')} 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            label="Phishing Lab" 
          />
          <TabButton 
            active={activeTab === 'password'} 
            onClick={() => setActiveTab('password')} 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            label="Passwords" 
          />
          <TabButton 
            active={activeTab === 'practices'} 
            onClick={() => setActiveTab('practices')} 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            label="Best Practices" 
          />
          <TabButton 
            active={activeTab === 'report'} 
            onClick={() => setActiveTab('report')} 
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
            label="Escalate" 
          />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderContent()}
        </div>
      </main>

      <footer className="py-6 border-t border-slate-900 text-center text-slate-600 text-xs">
        <p>&copy; 2024 CyberGuard Sentinel. For educational and guidance purposes only.</p>
        <p className="mt-1">Analyze suspicious content carefully. Never act on destructive instructions.</p>
      </footer>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const DashboardView: React.FC<{ onNavigate: (v: ViewState) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Your Proactive <span className="text-emerald-400">Security Command Center.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Protect yourself from evolving digital threats with AI-powered phishing detection, password hardening, and expert security guidance.
          </p>
          <button 
            onClick={() => onNavigate('phishing')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-xl shadow-emerald-900/30"
          >
            Start Threat Scan
          </button>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionCard 
          title="Analyze Phishing" 
          desc="Paste emails or links to verify if they are malicious scams." 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 003 20c0-2.554 1.258-4.814 3.191-6.206m3.903-5.26c-.463.308-.946.59-1.442.842M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.04l-.054.09A10.003 10.003 0 0121 20c0 2.554-1.258 4.814-3.191 6.206m-3.903-5.26c.463-.308.946-.59 1.442-.842M12 11V3m0 8v10M9.75 8.5L12 11l2.25-2.5" /></svg>}
          onClick={() => onNavigate('phishing')}
          color="emerald"
        />
        <ActionCard 
          title="Password Audit" 
          desc="Test your password strength against common hacking patterns." 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>}
          onClick={() => onNavigate('password')}
          color="blue"
        />
        <ActionCard 
          title="Security Tips" 
          desc="Get tailored advice on 2FA, VPNs, and online privacy." 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674a1 1 0 00.922-.606l.704-1.641a12.022 12.022 0 011.019-1.67c.845-1.176 1.387-2.441 1.387-3.802 0-3.48-2.82-6.3-6.3-6.3S4.5 5.82 4.5 9.3c0 1.36.542 2.626 1.387 3.803.302.422.643.98 1.019 1.67l.704 1.641a1 1 0 00.922.606zM10 21h4" /></svg>}
          onClick={() => onNavigate('practices')}
          color="purple"
        />
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; onClick: () => void; color: string }> = ({ title, desc, icon, onClick, color }) => {
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400 group-hover:bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-400 group-hover:bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 group-hover:bg-purple-500/10 border-purple-500/20',
  };

  return (
    <button 
      onClick={onClick}
      className="group text-left p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/40 transition-all hover:translate-y-[-4px]"
    >
      <div className={`p-3 w-fit rounded-xl border mb-4 transition-colors ${colorMap[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </button>
  );
};

export default App;
