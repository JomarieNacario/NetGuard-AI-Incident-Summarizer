import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface IncidentReport {
  executiveSummary: string;
  technicalFindings: string[];
  severityScore: number;
  severityJustification: string;
  remediationSteps: string[];
}

export async function analyzeLogs(logs: string): Promise<IncidentReport> {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: `Analyze the following raw technical data:\n\n${logs}`,
    config: {
      systemInstruction: "You are a Senior Cybersecurity Incident Responder. Your goal is to take raw, messy technical data (firewall logs, wireshark packet captures or Windows event logs) and transform it into a structured report. Tone: Professional, urgent but calm, and technically accurate.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING, description: "A 2-sentence non-technical overview of the risk." },
          technicalFindings: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Identification of specific patterns (e.g., Brute Force, TKIP weaknessess or port scanning)."
          },
          severityScore: { type: Type.NUMBER, description: "A 1-10 rating." },
          severityJustification: { type: Type.STRING, description: "A brief justification for the severity score." },
          remediationSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 clear, actionable steps for the IT team to take immediately."
          }
        },
        required: ["executiveSummary", "technicalFindings", "severityScore", "severityJustification", "remediationSteps"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate report.");
  }

  return JSON.parse(response.text) as IncidentReport;
}
