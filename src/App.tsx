import React, { useState } from 'react';
import { analyzeLogs, IncidentReport } from './services/geminiService';

export default function App() {
  const [logs, setLogs] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<IncidentReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!logs.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeLogs(logs);
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadJSON = () => {
    if (!report) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "incident_report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadTXT = () => {
    if (!report) return;
    const text = `INCIDENT RESPONSE REPORT
========================
Severity Score: ${report.severityScore}/10
Severity Justification: ${report.severityJustification}

EXECUTIVE SUMMARY
-----------------
${report.executiveSummary}

TECHNICAL FINDINGS
------------------
${report.technicalFindings.map(f => `- ${f}`).join('\n')}

REMEDIATION STEPS
-----------------
${report.remediationSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}
`;
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "incident_report.txt");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-white text-[#31333F] font-sans selection:bg-[#FF4B4B]/30">
      {/* Streamlit Top Decoration */}
      <div className="h-2 w-full bg-gradient-to-r from-[#FF4B4B] to-[#FF904B]" />
      
      <div className="max-w-[730px] mx-auto px-4 py-12">
        {/* st.title */}
        <h1 className="text-4xl font-bold mb-4 pb-2 text-[#31333F] tracking-tight">
          🚨 Incident Response Analyzer
        </h1>
        
        {/* st.markdown */}
        <p className="text-[16px] mb-8 text-[#31333F] leading-relaxed">
          Transforms raw technical data (firewall logs, PCAP summaries, or Windows event logs) into structured cybersecurity incident reports.
        </p>

        {/* st.text_area */}
        <div className="mb-6">
          <label className="text-[14px] mb-2 block text-[#31333F] font-medium">
            Raw Telemetry
          </label>
          <textarea
            value={logs}
            onChange={(e) => setLogs(e.target.value)}
            placeholder="Paste firewall logs, Windows Event Logs, PCAP summaries, or raw telemetry here..."
            className="w-full bg-[#F0F2F6] border border-transparent rounded-lg p-3 text-[16px] text-[#31333F] focus:outline-none focus:ring-2 focus:ring-[#FF4B4B] focus:bg-white transition-colors min-h-[250px] resize-y"
            spellCheck={false}
          />
          <div className="text-right mt-1">
            <span className="text-[12px] text-[#808495]">{logs.length} characters</span>
          </div>
        </div>

        {/* st.button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !logs.trim()}
          className="bg-white border border-[#d5d6d8] text-[#31333F] hover:border-[#FF4B4B] hover:text-[#FF4B4B] disabled:opacity-50 disabled:hover:border-[#d5d6d8] disabled:hover:text-[#31333F] px-4 py-2 rounded-lg transition-colors font-medium text-[15px] shadow-sm"
        >
          Generate Report
        </button>

        {/* st.spinner */}
        {isAnalyzing && (
          <div className="mt-8 flex items-center gap-3 text-[#31333F]">
            <div className="w-4 h-4 border-2 border-[#FF4B4B] border-t-transparent rounded-full animate-spin" />
            <span className="text-[15px]">Analyzing telemetry data...</span>
          </div>
        )}

        {/* st.error */}
        {error && (
          <div className="mt-8 bg-[#ffefef] text-[#9a2525] px-4 py-3 rounded-lg border border-[#fbc3c3] text-[15px] flex gap-3 items-start">
            <span className="text-lg leading-none">⚠️</span>
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        {/* Report Output */}
        {report && !isAnalyzing && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <hr className="border-[#F0F2F6] mb-8" />
            
            {/* st.header */}
            <h2 className="text-2xl font-bold text-[#31333F] border-b border-[#F0F2F6] pb-2">
              📊 Analysis Report
            </h2>

            {/* st.metric */}
            <div className="bg-white border border-[#F0F2F6] rounded-lg p-4 shadow-sm w-48">
              <div className="text-[14px] text-[#808495] mb-1">Severity Score</div>
              <div className="text-4xl font-bold text-[#31333F]">{report.severityScore}/10</div>
              <div className={`text-[13px] mt-1 font-medium ${report.severityScore >= 7 ? 'text-[#FF4B4B]' : report.severityScore >= 4 ? 'text-[#ffa421]' : 'text-[#09ab3b]'}`}>
                {report.severityScore >= 7 ? '▼ High Risk' : report.severityScore >= 4 ? '▶ Medium Risk' : '▲ Low Risk'}
              </div>
            </div>

            {/* st.info (Executive Summary) */}
            <div className="bg-[#e8f4fd] text-[#004280] px-4 py-4 rounded-lg border border-[#b8daff] text-[15px] flex gap-3 items-start">
              <span className="text-lg leading-none">ℹ️</span>
              <div>
                <strong>Executive Summary:</strong> {report.executiveSummary}
              </div>
            </div>

            {/* st.markdown (Justification) */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#31333F]">Severity Justification</h3>
              <p className="text-[15px] text-[#31333F] leading-relaxed">{report.severityJustification}</p>
            </div>

            {/* st.markdown (Technical Findings) */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#31333F]">Technical Findings</h3>
              <ul className="list-disc pl-6 space-y-1 text-[15px] text-[#31333F] leading-relaxed">
                {report.technicalFindings.map((finding, idx) => (
                  <li key={idx}>{finding}</li>
                ))}
              </ul>
            </div>

            {/* st.success (Remediation) */}
            <div className="bg-[#eef9f2] text-[#0f5132] px-4 py-4 rounded-lg border border-[#badbcc] flex gap-3 items-start">
              <span className="text-lg leading-none mt-0.5">✅</span>
              <div>
                <h3 className="text-[16px] font-semibold mb-2">
                  Immediate Remediation Steps
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] leading-relaxed">
                  {report.remediationSteps.map((step, idx) => (
                    <li key={idx} className="pl-1">{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-[#F0F2F6]">
              <button
                onClick={downloadJSON}
                className="bg-white border border-[#d5d6d8] text-[#31333F] hover:border-[#FF4B4B] hover:text-[#FF4B4B] px-4 py-2 rounded-lg transition-colors font-medium text-[15px] shadow-sm flex items-center gap-2"
              >
                <span>⬇️</span> Download JSON
              </button>
              <button
                onClick={downloadTXT}
                className="bg-white border border-[#d5d6d8] text-[#31333F] hover:border-[#FF4B4B] hover:text-[#FF4B4B] px-4 py-2 rounded-lg transition-colors font-medium text-[15px] shadow-sm flex items-center gap-2"
              >
                <span>⬇️</span> Download TXT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
