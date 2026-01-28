
import React, { useState } from 'react';

const ThreatReporter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Phishing',
    severity: 'High',
    description: '',
    department: 'IT Security'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send an email or log a ticket.
  };

  if (submitted) {
    return (
      <div className="bg-slate-800/50 p-8 rounded-xl border border-emerald-500/30 text-center animate-in zoom-in duration-300">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 rounded-full mb-4">
          <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Escalation Successful</h2>
        <p className="text-slate-400 mb-6">Your report has been securely transmitted to the {formData.department} team. You will be contacted if further information is required.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-emerald-400 hover:text-emerald-300 font-semibold underline"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Incident Escalation Portal
      </h2>
      <p className="text-sm text-slate-400 mb-6">Use this form to escalate serious threats, active attacks, or massive data exposure directly to the corporate security operations center (SOC).</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Threat Category</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Phishing Campaign</option>
              <option>Malware Infection</option>
              <option>Data Leak</option>
              <option>Unauthorized Access</option>
              <option>Social Engineering</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Severity Level</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
            >
              <option>Low - Informational</option>
              <option>Medium - Investigation Required</option>
              <option>High - Urgent Action</option>
              <option>Critical - Immediate Response</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Incident Report</label>
          <textarea 
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm h-32 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Describe what happened, when, and any systems involved..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-500 py-3 rounded-lg font-bold text-white transition-all shadow-lg shadow-red-900/20 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <span>ESCALATE TO SECURITY TEAM</span>
        </button>
      </form>
    </div>
  );
};

export default ThreatReporter;
