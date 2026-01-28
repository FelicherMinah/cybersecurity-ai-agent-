
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePhishing = async (content: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following email content or URL for phishing indicators, malicious intent, or social engineering tactics:
    
    CONTENT:
    ${content}
    
    Provide a detailed security assessment.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: {
            type: Type.STRING,
            description: "Risk level: Low, Medium, High, or Critical",
          },
          summary: {
            type: Type.STRING,
            description: "A short 1-sentence summary of the finding.",
          },
          details: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific red flags identified.",
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Actionable security steps for the user.",
          },
        },
        required: ["riskLevel", "summary", "details", "recommendations"],
      },
    },
  });

  try {
    return JSON.parse(response.text) as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to analyze content");
  }
};

export const getSecurityAdvice = async (topic?: string): Promise<string> => {
  const prompt = topic 
    ? `Provide concise, expert cybersecurity advice about: ${topic}. Focus on practical, non-destructive steps for an individual user.`
    : `Give 5 daily cybersecurity tips for staying safe online in 2024.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
        systemInstruction: "You are a world-class cybersecurity expert. Use Markdown formatting. Keep it professional but accessible."
    }
  });

  return response.text;
};
