
export interface AnalysisResult {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
  details: string[];
  recommendations: string[];
}

export interface PasswordAnalysis {
  score: number;
  suggestions: string[];
  strength: 'Weak' | 'Fair' | 'Good' | 'Strong';
}

export type ViewState = 'dashboard' | 'phishing' | 'password' | 'practices' | 'report';
