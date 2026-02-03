
import React from 'react';
import { CarbonProject } from '../types';
import { Upload, FileText } from 'lucide-react';

interface DatasetViewProps {
  data: CarbonProject[];
}

const DatasetView: React.FC<DatasetViewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-md">
          <h3 className="text-xl font-bold mb-2">Import Project Data</h3>
          <p className="text-slate-500 text-sm">Upload your historical carbon credit CSV files to begin the risk screening process.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
            <Upload className="w-4 h-4" />
            Upload CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-medium hover:border-emerald-600 hover:text-emerald-600 transition-colors">
            Download Template
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <span className="font-semibold text-slate-700">Recent Records ({data.length})</span>
          <FileText className="w-4 h-4 text-slate-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4 text-right">CO₂ Claimed (t)</th>
                <th className="px-6 py-4 text-right">Duration (mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{project.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{project.projectName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.projectType === 'Forestry' ? 'bg-green-100 text-green-700' :
                      project.projectType === 'Solar' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.projectType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{project.region}</td>
                  <td className="px-6 py-4 text-sm text-right tabular-nums">{project.claimedReduction.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right tabular-nums">{project.durationMonths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DatasetView;
