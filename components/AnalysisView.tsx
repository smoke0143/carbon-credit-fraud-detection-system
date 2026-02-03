
import React from 'react';
import { AnalysisResult } from '../types';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface AnalysisViewProps {
  results: AnalysisResult[];
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ results }) => {
  const anomalies = results.filter(r => r.isAnomaly);
  
  // Aggregate data for distribution chart
  const groupAggregation = results.reduce((acc, r) => {
    if (!acc[r.projectType]) acc[r.projectType] = { name: r.projectType, normal: 0, flagged: 0 };
    if (r.isAnomaly) acc[r.projectType].flagged++;
    else acc[r.projectType].normal++;
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(groupAggregation);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Risk Metrics Summary */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Analyzed', value: results.length, color: 'text-slate-900' },
          { label: 'Suspicious Claims', value: anomalies.length, color: 'text-rose-600' },
          { label: 'Avg Risk Score', value: (results.reduce((a,b)=>a+b.riskScore,0)/results.length).toFixed(2), color: 'text-amber-600' },
          { label: 'Alert Rate', value: `${((anomalies.length / results.length) * 100).toFixed(1)}%`, color: 'text-rose-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Scatter Plot */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Claim Deviation Mapping</h3>
        <p className="text-sm text-slate-500 mb-8 italic">Visualization of claimed reductions vs duration. Points are sized by risk score.</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="number" 
                dataKey="durationMonths" 
                name="Duration" 
                unit=" mo" 
                stroke="#94a3b8" 
                fontSize={12} 
                label={{ value: 'Monitoring Duration (Months)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="claimedReduction" 
                name="Claim" 
                unit=" t" 
                stroke="#94a3b8" 
                fontSize={12}
                label={{ value: 'Claimed Reduction', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis type="number" dataKey="riskScore" range={[50, 400]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Scatter name="Projects" data={results}>
                {results.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isAnomaly ? '#f43f5e' : '#10b981'} 
                    fillOpacity={0.6}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-6">Flagged Claims by Sector</h3>
        <p className="text-sm text-slate-500 mb-8 italic">Breakdown of normal vs suspicious projects within each ecosystem type.</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} width={100} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="normal" stackId="a" fill="#dcfce7" name="Baseline Projects" radius={[0, 0, 0, 0]} />
              <Bar dataKey="flagged" stackId="a" fill="#f43f5e" name="High Risk Claims" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
