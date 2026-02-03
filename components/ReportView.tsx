
import React from 'react';
import { AnalysisResult } from '../types';
import { AlertTriangle, ChevronRight, Info } from 'lucide-react';

interface ReportViewProps {
  results: AnalysisResult[];
}

const ReportView: React.FC<ReportViewProps> = ({ results }) => {
  const flags = results.filter(r => r.isAnomaly).sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-8">
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-start gap-4">
        <div className="bg-rose-100 p-3 rounded-2xl">
          <AlertTriangle className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <h3 className="text-rose-900 font-bold text-lg">Potential Anomalies Detected</h3>
          <p className="text-rose-700 text-sm max-w-2xl mt-1">
            The system has flagged {flags.length} projects where claimed reductions are statistically significantly higher than the peer average for similar project types. These should be prioritized for manual verification.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {flags.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 p-6 rounded-3xl hover:shadow-md transition-shadow group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-slate-400">
                  {item.projectType[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg">{item.projectName}</h4>
                    <span className="bg-rose-100 text-rose-600 text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-widest">High Risk</span>
                  </div>
                  <p className="text-slate-500 text-sm">{item.id} • {item.region}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-auto">
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Risk Score</p>
                  <p className="text-xl font-bold text-rose-600">{(item.riskScore * 100).toFixed(0)}%</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Z-Score</p>
                  <p className="text-xl font-bold text-slate-800">{item.zScore.toFixed(2)}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Vs Group Avg</p>
                  <p className="text-xl font-bold text-emerald-600">+{Math.round((item.reductionRate / item.groupMean - 1) * 100)}%</p>
                </div>
                <div className="flex items-center justify-end">
                  <button className="p-3 rounded-full hover:bg-slate-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex gap-3 text-sm text-slate-600">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>Claimed <span className="font-bold">{item.claimedReduction.toLocaleString()} tons</span> over {item.durationMonths} months. Standard rate for {item.projectType} projects is typically {Math.round(item.groupMean)} tons/mo.</p>
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3">
                <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-emerald-600">Flag for Review</button>
                <button className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors">View Satellite Proof</button>
              </div>
            </div>
          </div>
        ))}

        {flags.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No anomalies detected in the current dataset.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportView;
