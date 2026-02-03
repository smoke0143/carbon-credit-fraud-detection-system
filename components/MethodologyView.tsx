
import React from 'react';
import { getProjectExplanation } from '../services/geminiService';
import { BrainCircuit, Sparkles, Send, ShieldAlert, Scale } from 'lucide-react';

const MethodologyView: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [response, setResponse] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAskAI = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);
    const result = await getProjectExplanation(query);
    setResponse(result);
    setIsLoading(false);
  };

  const suggestions = [
    "How does the Z-score help identify outlier claims?",
    "What are the limitations of statistical anomaly detection in forestry?",
    "Explain the ethical difference between a risk flag and a fraud accusation.",
    "Why do we group projects by type before calculating mean rates?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Science & Ethics</h2>
        <p className="text-slate-500">Learn how EcoGuard analyzes project integrity without making premature accusations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Scale className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">Risk vs. Fraud</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Statistical detection identifies <strong>anomalies</strong>—data points that don't fit the expected pattern. In carbon markets, a high reduction claim might be due to innovative technology, or it might be an overstatement. Our system provides a <strong>Risk Score</strong> to prioritize human investigation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="bg-rose-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-800">Ethical Guardrails</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Automated systems should never be the sole decision-maker. Factors like unusual weather patterns, local economic shifts, or monitoring equipment failure can cause false positives. Manual verification and site audits remain essential.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">AI Assistant</span>
          </div>
          
          <h3 className="text-2xl font-bold mb-6">Ask about the Methodology</h3>
          
          <form onSubmit={handleAskAI} className="relative group">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How does grouping projects by type reduce false positives?"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-5 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-white placeholder-slate-500"
            />
            <button 
              type="submit"
              disabled={isLoading || !query}
              className="absolute right-3 top-3 bottom-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-900 rounded-xl transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => setQuery(s)}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {(isLoading || response) && (
            <div className="mt-10 p-8 bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="text-slate-400 text-sm ml-2">Consulting Knowledge Base...</span>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none prose-sm">
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{response}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MethodologyView;
